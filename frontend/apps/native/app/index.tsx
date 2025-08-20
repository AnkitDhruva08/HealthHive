import { View, Text, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';

export default function HomeScreen() {
  const [count, setCount] = useState(0);

  return (
    <View className="flex-1 bg-gray-50 items-center justify-center p-6">
      <StatusBar style="auto" />
      
      <View className="max-w-sm w-full bg-white rounded-xl shadow-lg p-8">
        <Text className="text-sm font-semibold text-indigo-500 uppercase tracking-wide">
          Tailwind Monorepo
        </Text>
        
        <Text className="text-lg font-medium text-black mt-1">
          Native App with Expo + React Native
        </Text>
        
        <Text className="text-gray-500 mt-2">
          This is the native application built with Expo, React Native, and NativeWind.
        </Text>
        
        <View className="mt-6 flex-row space-x-4">
          <Pressable
            className="bg-blue-600 px-4 py-2 rounded-md flex-1"
            onPress={() => setCount((count) => count + 1)}
          >
            <Text className="text-white font-medium text-center">
              Count is {count}
            </Text>
          </Pressable>
          
          <Pressable
            className="bg-gray-200 px-4 py-2 rounded-md flex-1"
            onPress={() => setCount(0)}
          >
            <Text className="text-gray-900 font-medium text-center">
              Reset
            </Text>
          </Pressable>
        </View>
        
        <View className="mt-6 p-4 bg-gray-100 rounded-lg">
          <Text className="text-sm font-medium text-gray-900 mb-2">Features:</Text>
          <Text className="text-sm text-gray-600">✅ Expo + React Native</Text>
          <Text className="text-sm text-gray-600">✅ NativeWind (Tailwind for RN)</Text>
          <Text className="text-sm text-gray-600">✅ TypeScript</Text>
          <Text className="text-sm text-gray-600">✅ Monorepo with pnpm</Text>
          <Text className="text-sm text-gray-600">🔄 Supabase integration (coming soon)</Text>
        </View>
      </View>
    </View>
  );
}