import React, { useState } from "react";
import {
  View,
  Text,
  Modal,
  TouchableOpacity,
  FlatList,
  StyleSheet,
} from "react-native";

// Define types
type Location = {
  city: string;
  country: string;
  countryCode: string;
  lat: string;
  lon: string;
  placeID: string;
  state: string;
  stateCode: string;
};

type BusinessData = {
  profilePicture: string | null;
  name: string;
  email: string;
  userName: string;
  password: string;
  confirmPassword: string;
  businessType: string;
  location: Location;
  images: any[];
};

type BusinessTypeDropdownProps = {
  businessData: BusinessData;
  handleChange: (field: keyof BusinessData, value: string) => void;
  textColor: string;
};

const BusinessTypeDropdown: React.FC<BusinessTypeDropdownProps> = ({
  businessData,
  handleChange,
  textColor,
}) => {
  const [modalVisible, setModalVisible] = useState(false);

  const businessTypes = [
    { label: "Restaurant", value: "restaurant" },
    { label: "Cafe & Bakery", value: "cafe" },
    { label: "Stay Provider", value: "stay" },
    { label: "Movie Theaters", value: "movie" },
    { label: "Game Spots", value: "games" },
  ];

  const selectedLabel =
    businessTypes.find((item) => item.value === businessData.businessType)
      ?.label || "Select ";

  const handleSelect = (value: string) => {
    handleChange("businessType", value);
    setModalVisible(false);
  };

  return (
    <View style={{ width: "100%" }}>
      <TouchableOpacity
        style={styles.dropdownButton}
        onPress={() => setModalVisible(true)}
      >
        <Text style={{ color: textColor }}>{selectedLabel}</Text>
      </TouchableOpacity>

      <Modal visible={modalVisible} animationType="slide" transparent={true}>
        <TouchableOpacity
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            <FlatList
              data={businessTypes}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={styles.option}
                  onPress={() => handleSelect(item.value)}
                >
                  <Text style={{ color: textColor }}>{item.label}</Text>
                </TouchableOpacity>
              )}
            />
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  dropdownButton: {
    padding: 12,
    borderWidth: 1,
    borderRadius: 6,
    borderColor: "#ccc",
    backgroundColor: "#f5f5f5",
    width: 350,
    marginBottom: 8,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: "rgba(0,0,0,0.3)",
    paddingHorizontal: 30,
  },
  modalContent: {
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingVertical: 20,
  },
  option: {
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "#eee",
  },
});

export default BusinessTypeDropdown;
