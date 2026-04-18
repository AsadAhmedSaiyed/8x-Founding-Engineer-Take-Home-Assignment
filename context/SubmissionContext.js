import { createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

export const SubmissionContext = createContext();

export const SubmissionProvider = ({ children }) => {
  const [submissions, setSubmissions] = useState([]);

  // 🔹 Load data when app starts
  useEffect(() => {
    loadSubmissions();
  }, []);

  const loadSubmissions = async () => {
    try {
      const data = await AsyncStorage.getItem("submissions");
      if (data) {
        setSubmissions(JSON.parse(data));
      }
    } catch (error) {
      console.log("Error loading data", error);
    }
  };

  // 🔹 Save data
  const saveSubmissions = async (newData) => {
    try {
      await AsyncStorage.setItem("submissions", JSON.stringify(newData));
    } catch (error) {
      console.log("Error saving data", error);
    }
  };

  // 🔹 Add submission
  const addSubmission = (campaign, url) => {
    // 70% Pending, 20% Approved, 10% Rejected for more realistic demo
    const random = Math.random();
    let status;
    if (random < 0.7) {
      status = "pending";
    } else if (random < 0.9) {
      status = "approved";
    } else {
      status = "rejected";
    }

    const newSubmission = {
      id: Date.now().toString(),
      campaign: {
        brand: campaign.brand,
        category: campaign.category,
        payout: campaign.payout,
      },
      url,
      status,
      date: new Date().toLocaleDateString(),
    };

    const updated = [newSubmission, ...submissions];

    setSubmissions(updated);
    saveSubmissions(updated); // 🔥 persistence
  };

  return (
    <SubmissionContext.Provider value={{ submissions, addSubmission }}>
      {children}
    </SubmissionContext.Provider>
  );
};