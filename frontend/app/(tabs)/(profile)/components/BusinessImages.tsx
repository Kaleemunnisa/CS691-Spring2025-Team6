import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  TouchableOpacity,
  FlatList,
} from "react-native";
import Icon from "react-native-vector-icons/Feather";
import pickImage from "@/utils/image-pickers/PickImage"; // Adjust the path as needed

interface BusinessImage {
  uri: string;
  public_id: string;
  [key: string]: any;
}
interface propsBusinessImagesUpdateSection {
  //   userData?: any;
  setBusinessImages?: (images: BusinessImage[]) => void;
  businessImages?: BusinessImage[];
  //   setLoading?: (loading: boolean) => void;
  //   setError?: (error: any) => void;
  //   loading?: boolean;
  //   error?: any;
}

const BusinessImagesUpdateSection: React.FC<
  propsBusinessImagesUpdateSection
> = ({
  //   userData,
  setBusinessImages,
  businessImages = [],
  //   setLoading,
  //   setError,
  //   loading,
  //   error,
}) => {
  //   useEffect(() => {
  //     if (businessImages && businessImages.length === 0) {
  //       setBusinessImages?.(userData.images);
  //     }
  //   }, [userData]);

  useEffect(() => {
    console.log("Business Images inside update section", businessImages);
  }, [businessImages]);

  const [imageNeedToChange, setImageNeedToChange] = useState<any>();
  const [imageUpadetLoading, setImageUpdateLoading] = useState(false);
  const handleChangeImage = async (index: number) => {
    console.log("Change image clicked", index);

    const updatedImages = [...businessImages];

    console.log("After States");
    await pickImage(setImageNeedToChange, setImageUpdateLoading).then();
    console.log("Image picked need to change:", imageNeedToChange);

    if (imageNeedToChange) {
      updatedImages[index] = {
        ...updatedImages[index],
        uri: imageNeedToChange,
      };
      console.log("Updated Images", updatedImages);
      setBusinessImages?.(updatedImages);
      setImageUpdateLoading(false);
    }
  };

  const renderImageItem = ({
    item,
    index,
  }: {
    item: BusinessImage;
    index: number;
  }) => (
    <View style={styles.imageWrapper}>
      <Image source={{ uri: item.uri }} style={styles.image} />
      <TouchableOpacity
        style={styles.editIcon}
        onPress={() => handleChangeImage(index)}
      >
        <Icon name="edit-2" size={18} color="#fff" />
      </TouchableOpacity>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Business Images</Text>
      <Text style={styles.description}>Update your business images here.</Text>
      {/* <Text>{businessImages[0].public_id}</Text> */}
      <FlatList
        data={businessImages}
        horizontal
        keyExtractor={(item: BusinessImage) => item.public_id}
        renderItem={renderImageItem}
        contentContainerStyle={{ paddingVertical: 10 }}
        showsHorizontalScrollIndicator={false}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "80%",
    flex: 1,
    justifyContent: "center",
    alignItems: "flex-start",
    backgroundColor: "#f8f8f8",
    padding: 20,
    borderRadius: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: "#ccc",
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
    color: "#333",
  },
  description: {
    fontSize: 16,
    color: "#666",
    textAlign: "left",
  },
  imageWrapper: {
    position: "relative",
    marginRight: 12,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 8,
    resizeMode: "cover",
  },
  editIcon: {
    position: "absolute",
    right: 6,
    bottom: 6,
    backgroundColor: "rgba(0,0,0,0.6)",
    padding: 4,
    borderRadius: 16,
  },
});

export default BusinessImagesUpdateSection;
