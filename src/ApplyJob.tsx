import React, { useState, useEffect } from "react";
import {View,Text,TextInput,TouchableOpacity,Alert,KeyboardAvoidingView,ScrollView,Platform,TouchableWithoutFeedback,Keyboard,} from "react-native";
import { useNavigation, useRoute } from "@react-navigation/native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { applyJobStyles } from "./styles/ApplyJobStyles";
import { useTheme } from "./ThemeContext";
import { Ionicons } from '@expo/vector-icons';
import {
  ApplyJobScreenNavigationProp,
  ApplyJobScreenRouteProp
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
      !name ||
      !validateEmail(email) ||
      !validateContact(contact) ||
      !reason ||
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
    if (isButtonDisabled) return;

    try {
      await onApplyJob(jobId);
      setIsApplied(true);
      
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
      Alert.alert("Error", "Failed to submit application");
      setIsApplied(false);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
      keyboardVerticalOffset={Platform.select({ ios: 60, android: 0 })}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <ScrollView
          contentContainerStyle={[
            applyJobStyles.container,
            isDarkMode && applyJobStyles.darkContainer,
          ]}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={applyJobStyles.headerContainer}>
            <Text style={[
              applyJobStyles.header, 
              isDarkMode && applyJobStyles.darkText
            ]}>
              {jobTitle}
            </Text>
            <Text style={[
              applyJobStyles.company, 
              isDarkMode && applyJobStyles.darkSubtext
            ]}>
              {company}
            </Text>
          </View>

          <View style={applyJobStyles.formContainer}>
            <View style={applyJobStyles.inputContainer}>
              <Text style={[
                applyJobStyles.label,
                isDarkMode && applyJobStyles.darkText
              ]}>
                Full Name
              </Text>
              <TextInput
                style={[
                  applyJobStyles.input,
                  isDarkMode && applyJobStyles.darkInput
                ]}
                placeholder="Alfeah Star A. Punzalan"
                placeholderTextColor={isDarkMode ? '#999' : '#888'}
                value={name}
                onChangeText={setName}
                returnKeyType="next"
              />
            </View>

            <View style={applyJobStyles.inputContainer}>
              <Text style={[
                applyJobStyles.label,
                isDarkMode && applyJobStyles.darkText
              ]}>
                Email
              </Text>
              <TextInput
                style={[
                  applyJobStyles.input,
                  isDarkMode && applyJobStyles.darkInput
                ]}
                placeholder="example@email.com"
                placeholderTextColor={isDarkMode ? '#999' : '#888'}
                value={email}
                onChangeText={setEmail}
                keyboardType="email-address"
                autoCapitalize="none"
                returnKeyType="next"
              />
            </View>

            <View style={applyJobStyles.inputContainer}>
              <Text style={[
                applyJobStyles.label,
                isDarkMode && applyJobStyles.darkText
              ]}>
                Contact Number
              </Text>
              <TextInput
                style={[
                  applyJobStyles.input,
                  isDarkMode && applyJobStyles.darkInput
                ]}
                placeholder="09123456789"
                placeholderTextColor={isDarkMode ? '#999' : '#888'}
                value={contact}
                onChangeText={setContact}
                keyboardType="phone-pad"
                maxLength={11}
                returnKeyType="next"
              />
            </View>

            <View style={applyJobStyles.inputContainer}>
              <Text style={[
                applyJobStyles.label,
                isDarkMode && applyJobStyles.darkText
              ]}>
                Why should we hire you?
              </Text>
              <TextInput
                style={[
                  applyJobStyles.input,
                  applyJobStyles.textArea,
                  isDarkMode && applyJobStyles.darkInput
                ]}
                placeholder="Describe your qualifications and why you're a good fit..."
                placeholderTextColor={isDarkMode ? '#999' : '#888'}
                value={reason}
                onChangeText={setReason}
                multiline
                returnKeyType="done"
              />
            </View>
          </View>

          <TouchableOpacity
            style={[
              applyJobStyles.button,
              (isButtonDisabled || isApplied) && applyJobStyles.buttonDisabled,
            ]}
            onPress={handleApply}
            disabled={isButtonDisabled || isApplied}
          >
            <Text style={applyJobStyles.buttonText}>
              {isApplied ? (
                <>
                  <Ionicons name="checkmark-circle" size={18} color="white" /> Applied
                </>
              ) : (
                "Submit Application"
              )}
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default ApplyJob;