import React, { useState, useEffect } from "react";
import {View,Text,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView,ScrollView,Platform,TouchableWithoutFeedback,Keyboard,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyJobStyles } from "./styles/ApplyJobStyles";
import { useTheme } from "./ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import {
  ApplyJobScreenNavigationProp,
  ApplyJobScreenRouteProp,
} from "./navigationTypes";

interface ApplyJobProps {
  onApplyJob: (jobId: string) => Promise<void>;
}

const ApplyJob: React.FC<ApplyJobProps> = ({ onApplyJob }) => {
  const navigation = useNavigation<ApplyJobScreenNavigationProp>();
  const route = useRoute<ApplyJobScreenRouteProp>();
  const { jobId, jobTitle, company, routeName } = route.params;
  const { isDarkMode } = useTheme();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [contact, setContact] = useState("");
  const [reason, setReason] = useState("");
  const [isApplied, setIsApplied] = useState(false);
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const scrollViewRef = React.useRef<ScrollView>(null);

  useEffect(() => {
    const checkAppliedJobs = async () => {
      const storedAppliedJobs = await AsyncStorage.getItem("appliedJobs");
      if (storedAppliedJobs) {
        const appliedList = JSON.parse(storedAppliedJobs);
        setIsApplied(appliedList.includes(jobId));
      }
    };
    checkAppliedJobs();
  }, [jobId]);

  useEffect(() => {
    setIsButtonDisabled(
      !name.trim() ||
      !validateEmail(email) ||
      !validateContact(contact) ||
      !reason.trim() ||
      isApplied
    );
  }, [name, email, contact, reason, isApplied]);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const validateContact = (contact: string) => {
    return /^\d{11}$/.test(contact);
  };

  const handleApply = async () => {
    if (isButtonDisabled || isApplied) return;

    try {
      await onApplyJob(jobId);
      setIsApplied(true);
      
      const updatedAppliedJobs = await AsyncStorage.getItem("appliedJobs");
      let appliedJobsArray = updatedAppliedJobs ? JSON.parse(updatedAppliedJobs) : [];
      if (!appliedJobsArray.includes(jobId)) {
        appliedJobsArray.push(jobId);
        await AsyncStorage.setItem("appliedJobs", JSON.stringify(appliedJobsArray));
      }

      Alert.alert(
        "Application Submitted", 
        "Your application has been successfully submitted!",
        [
          {
            text: "OK",
            onPress: () => {
              if (routeName === 'JobFinderPage') {
                navigation.navigate('JobFinderPage');
              } else {
                navigation.navigate('JobFinderPage', { screen: 'Saved Jobs' });
              }
            }
          }
        ]
      );
    } catch (error) {
      console.error("Application error:", error);
      Alert.alert("Error", "Failed to submit application. Please try again.");
      setIsApplied(false);
    }
  };

  const handleContentSizeChange = () => {
    if (scrollViewRef.current) {
      scrollViewRef.current.scrollToEnd({ animated: true });
    }
  };

  const getInputStyle = () => {
    return [
      applyJobStyles.input,
      isDarkMode && applyJobStyles.darkInput,
      isApplied && applyJobStyles.disabledInput,
      isApplied && isDarkMode && applyJobStyles.darkDisabledInput,
    ];
  };

  const getTextAreaStyle = () => {
    return [
      applyJobStyles.input,
      applyJobStyles.textArea,
      isDarkMode && applyJobStyles.darkInput,
      isApplied && applyJobStyles.disabledTextArea,
      isApplied && isDarkMode && applyJobStyles.darkDisabledTextArea,
    ];
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 0 })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[
            applyJobStyles.scrollContainer,
            isDarkMode && applyJobStyles.darkContainer,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
          onContentSizeChange={handleContentSizeChange}
        >
          <View style={applyJobStyles.contentContainer}>
            <View style={applyJobStyles.headerContainer}>
              <Text
                style={[
                  applyJobStyles.header,
                  isDarkMode && applyJobStyles.darkText,
                  isApplied && applyJobStyles.disabledText,
                ]}
              >
                {jobTitle}
              </Text>
              <Text
                style={[
                  applyJobStyles.company,
                  isDarkMode && applyJobStyles.darkSubtext,
                  isApplied && applyJobStyles.disabledSubtext,
                ]}
              >
                {company}
              </Text>
            </View>

            <View style={applyJobStyles.formContainer}>
              <View style={applyJobStyles.inputContainer}>
                <Text
                  style={[
                    applyJobStyles.label,
                    isDarkMode && applyJobStyles.darkText,
                    isApplied && applyJobStyles.disabledLabel,
                  ]}
                >
                  Full Name
                </Text>
                <TextInput
                  style={getInputStyle()}
                  placeholder="Alfeah Star A. Punzalan"
                  placeholderTextColor={
                    isApplied 
                      ? isDarkMode 
                        ? applyJobStyles.darkDisabledPlaceholder.color 
                        : applyJobStyles.disabledPlaceholder.color
                      : isDarkMode 
                        ? "#999" 
                        : "#888"
                  }
                  value={name}
                  onChangeText={setName}
                  returnKeyType="next"
                  editable={!isApplied}
                />
              </View>

              <View style={applyJobStyles.inputContainer}>
                <Text
                  style={[
                    applyJobStyles.label,
                    isDarkMode && applyJobStyles.darkText,
                    isApplied && applyJobStyles.disabledLabel,
                  ]}
                >
                  Email
                </Text>
                <TextInput
                  style={getInputStyle()}
                  placeholder="example@email.com"
                  placeholderTextColor={
                    isApplied 
                      ? isDarkMode 
                        ? applyJobStyles.darkDisabledPlaceholder.color 
                        : applyJobStyles.disabledPlaceholder.color
                      : isDarkMode 
                        ? "#999" 
                        : "#888"
                  }
                  value={email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  returnKeyType="next"
                  editable={!isApplied}
                />
              </View>

              <View style={applyJobStyles.inputContainer}>
                <Text
                  style={[
                    applyJobStyles.label,
                    isDarkMode && applyJobStyles.darkText,
                    isApplied && applyJobStyles.disabledLabel,
                  ]}
                >
                  Contact Number
                </Text>
                <TextInput
                  style={getInputStyle()}
                  placeholder="09123456789"
                  placeholderTextColor={
                    isApplied 
                      ? isDarkMode 
                        ? applyJobStyles.darkDisabledPlaceholder.color 
                        : applyJobStyles.disabledPlaceholder.color
                      : isDarkMode 
                        ? "#999" 
                        : "#888"
                  }
                  value={contact}
                  onChangeText={setContact}
                  keyboardType="phone-pad"
                  maxLength={11}
                  returnKeyType="next"
                  editable={!isApplied}
                />
              </View>

              <View style={applyJobStyles.inputContainer}>
                <Text
                  style={[
                    applyJobStyles.label,
                    isDarkMode && applyJobStyles.darkText,
                    isApplied && applyJobStyles.disabledLabel,
                  ]}
                >
                  Why should we hire you?
                </Text>
                <TextInput
                  style={getTextAreaStyle()}
                  placeholder="Describe your qualifications and why you're a good fit..."
                  placeholderTextColor={
                    isApplied 
                      ? isDarkMode 
                        ? applyJobStyles.darkDisabledPlaceholder.color 
                        : applyJobStyles.disabledPlaceholder.color
                      : isDarkMode 
                        ? "#999" 
                        : "#888"
                  }
                  value={reason}
                  onChangeText={setReason}
                  multiline
                  returnKeyType="done"
                  editable={!isApplied}
                />
              </View>
            </View>

            <View style={applyJobStyles.buttonWrapper}>
              <TouchableOpacity
                style={[
                  applyJobStyles.button,
                  (isButtonDisabled || isApplied) && applyJobStyles.buttonDisabled,
                ]}
                onPress={handleApply}
                disabled={isButtonDisabled || isApplied}
                activeOpacity={0.7}
              >
                {isApplied ? (
                  <View style={{ flexDirection: "row", alignItems: "center" }}>
                    <Ionicons name="checkmark-circle" size={18} color="white" />
                    <Text style={applyJobStyles.buttonText}> Applied</Text>
                  </View>
                ) : (
                  <Text style={applyJobStyles.buttonText}>Submit Application</Text>
                )}
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ApplyJob;