import { CreateUserParams, SignInParams } from "@/type";
import { Account, Avatars, Client, Databases, ID, Query } from "react-native-appwrite";

export const appwriteConfig = {
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT as string,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID as string,
  platform: "com.madestart.foodapp",
  databaseId: "69a2314100381d4205ec",
  userCollectionId: "user",
};

export const client = new Client()
.setEndpoint(appwriteConfig.endpoint)
.setProject(appwriteConfig.projectId)
.setPlatform(appwriteConfig.platform);

export const account = new Account(client);
export const databases = new Databases(client);
export const avatars = new Avatars(client);

export const createUser = async ({
  email,
  password,
  name,
} : CreateUserParams) => {
  try {
    const newAccount = await account.create(
      ID.unique(),
      email,
      password,
      name
    );

    if(!newAccount) throw new Error("Account not created");

    await signIn({ email, password });

    const avatarUrl = avatars.getInitialsURL(name);

    return await databases.createDocument(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      ID.unique(),
      { email, name, accountId: newAccount.$id, avatar: avatarUrl}
    );
    
  } catch (e: any) {
    throw new Error(e.message || "Failed to create user");

  }
};

export const signIn = async ({
  email,
  password,
} : SignInParams) => {
  try {
    await account.createEmailPasswordSession(email, password);

  } catch (e: any) {
    throw new Error(e.message || "Failed to sign in")
  }
};

export const getCurrentUser = async () => {
  try {
    const currentAccount = await account.get();
    if (!currentAccount) throw Error;

    const currentUser = await databases.listDocuments(
      appwriteConfig.databaseId,
      appwriteConfig.userCollectionId,
      [Query.equal('accountId', currentAccount.$id)]
    )

    if (!currentUser) throw Error;

    return currentUser.documents[0];

  } catch (e) {
    console.log(console.error);
    throw new Error(e as string);
  }
}