import { Modal, Platform, Text, TouchableOpacity, View } from 'react-native';

import { AuthField } from '@/features/auth/components/auth-field';
import DateTimePicker from '@react-native-community/datetimepicker';
import { IntroductionData } from '../types';
import { Ionicons } from '@expo/vector-icons';
import { useState } from 'react';

interface StepFourProps {
  data: IntroductionData;
  onUpdate: (updates: Partial<IntroductionData>) => void;
}

const DATE_PICKER_STYLE = { height: 200 } as const;

const GENDER_OPTIONS = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
];

const COUNTRY_OPTIONS = [
  { flag: '🇺🇸', code: '+1', country: 'United States' },
  { flag: '🇨🇦', code: '+1', country: 'Canada' },
  { flag: '🇬🇧', code: '+44', country: 'United Kingdom' },
  { flag: '🇦🇺', code: '+61', country: 'Australia' },
  { flag: '🇩🇪', code: '+49', country: 'Germany' },
  { flag: '🇫🇷', code: '+33', country: 'France' },
  { flag: '🇮🇹', code: '+39', country: 'Italy' },
  { flag: '🇪🇸', code: '+34', country: 'Spain' },
  { flag: '🇳🇱', code: '+31', country: 'Netherlands' },
  { flag: '🇧🇪', code: '+32', country: 'Belgium' },
  { flag: '🇨🇭', code: '+41', country: 'Switzerland' },
  { flag: '🇦🇹', code: '+43', country: 'Austria' },
  { flag: '🇸🇪', code: '+46', country: 'Sweden' },
  { flag: '🇳🇴', code: '+47', country: 'Norway' },
  { flag: '🇩🇰', code: '+45', country: 'Denmark' },
  { flag: '🇫🇮', code: '+358', country: 'Finland' },
  { flag: '🇵🇱', code: '+48', country: 'Poland' },
  { flag: '🇮🇪', code: '+353', country: 'Ireland' },
  { flag: '🇵🇹', code: '+351', country: 'Portugal' },
  { flag: '🇬🇷', code: '+30', country: 'Greece' },
  { flag: '🇷🇺', code: '+7', country: 'Russia' },
  { flag: '🇯🇵', code: '+81', country: 'Japan' },
  { flag: '🇨🇳', code: '+86', country: 'China' },
  { flag: '🇮🇳', code: '+91', country: 'India' },
  { flag: '🇧🇷', code: '+55', country: 'Brazil' },
  { flag: '🇲🇽', code: '+52', country: 'Mexico' },
  { flag: '🇦🇷', code: '+54', country: 'Argentina' },
  { flag: '🇿🇦', code: '+27', country: 'South Africa' },
  { flag: '🇳🇿', code: '+64', country: 'New Zealand' },
  { flag: '🇸🇬', code: '+65', country: 'Singapore' },
  { flag: '🇭🇰', code: '+852', country: 'Hong Kong' },
  { flag: '🇰🇷', code: '+82', country: 'South Korea' },
  { flag: '🇹🇼', code: '+886', country: 'Taiwan' },
  { flag: '🇹🇭', code: '+66', country: 'Thailand' },
  { flag: '🇲🇾', code: '+60', country: 'Malaysia' },
  { flag: '🇮🇩', code: '+62', country: 'Indonesia' },
  { flag: '🇵🇭', code: '+63', country: 'Philippines' },
  { flag: '🇻🇳', code: '+84', country: 'Vietnam' },
  { flag: '🇦🇪', code: '+971', country: 'United Arab Emirates' },
  { flag: '🇸🇦', code: '+966', country: 'Saudi Arabia' },
  { flag: '🇮🇱', code: '+972', country: 'Israel' },
  { flag: '🇹🇷', code: '+90', country: 'Turkey' },
  { flag: '🇪🇬', code: '+20', country: 'Egypt' },
];

const formatDate = (date: Date | null): string => {
  if (!date) return '';
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const year = date.getFullYear();
  return `${month}/${day}/${year}`;
};

const parseDate = (dateString: string): Date | null => {
  if (!dateString) return null;
  const parts = dateString.split('/');
  if (parts.length !== 3) return null;
  const month = parseInt(parts[0], 10) - 1;
  const day = parseInt(parts[1], 10);
  const year = parseInt(parts[2], 10);
  const isNotValidDate = isNaN(month) || isNaN(day) || isNaN(year);
  if (isNotValidDate) return null;
  return new Date(year, month, day);
};

export function StepFour({ data, onUpdate }: StepFourProps) {
  const [showGenderModal, setShowGenderModal] = useState(false);
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showCountryModal, setShowCountryModal] = useState(false);
  const [tempDate, setTempDate] = useState<Date | null>(null);

  const selectedCountry = COUNTRY_OPTIONS.find(
    c => c.code === data.countryCode
  ) || COUNTRY_OPTIONS[0];

  const getSelectedDate = (): Date => {
    if (tempDate) return tempDate;
    return parseDate(data.dateOfBirth) || new Date(2000, 0, 1);
  };

  const handleOpenDatePicker = () => {
    setTempDate(parseDate(data.dateOfBirth) || new Date(2000, 0, 1));
    setShowDatePicker(true);
  };

  const handleCloseDatePicker = () => {
    setTempDate(null);
    setShowDatePicker(false);
  };

  return (
    <View className="flex-1">
      <Text className="text-3xl font-bold text-gray-900 mb-4">
        Final Steps!
      </Text>
      <Text className="text-base text-gray-600 leading-6 mb-8">
        We're almost there! Fill in your personal details to create a profile
        and start your journey towards a furry friendship.
      </Text>

      <View className="space-y-4">
        <AuthField
          label="First Name"
          required
          placeholder="Enter your first name"
          value={data.firstName}
          onChangeText={text => onUpdate({ firstName: text })}
        />

        <AuthField
          label="Last Name"
          required
          placeholder="Enter your last name"
          value={data.lastName}
          onChangeText={text => onUpdate({ lastName: text })}
        />

        <AuthField
          label="Email"
          required
          placeholder="Enter your email"
          keyboardType="email-address"
          autoCapitalize="none"
          value={data.email}
          onChangeText={text => onUpdate({ email: text })}
        />

        {/* Phone Number with country code */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2 gap-1">
            <Text className="text-xs font-bold text-secondary-500 uppercase tracking-wider">
              Phone Number
            </Text>
          </View>
          <View className="flex-row gap-3 items-center">
            <TouchableOpacity
              onPress={() => setShowCountryModal(true)}
              className="w-24 h-[52px] border border-secondary-200 rounded-xl bg-white flex-row items-center justify-between px-3"
            >
              <Text className="text-base text-gray-900">
                {selectedCountry.flag} {selectedCountry.code}
              </Text>
              <Ionicons name="chevron-down" size={16} color="#6b7280" />
            </TouchableOpacity>
            <View className="flex-1">
              <AuthField
                label=""
                placeholder="111 467 378 399"
                keyboardType="phone-pad"
                containerClassName="mb-0"
                value={data.phone}
                onChangeText={text => onUpdate({ phone: text })}
              />
            </View>
          </View>
        </View>

        {/* Date of Birth */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2 gap-1">
            <Text className="text-xs font-bold text-secondary-500 uppercase tracking-wider">
              Date of Birth
            </Text>
          </View>
          <TouchableOpacity
            onPress={handleOpenDatePicker}
            className="w-full px-4 py-3.5 border border-secondary-200 rounded-xl bg-white flex-row justify-between items-center"
          >
            <Text
              className={`text-base ${data.dateOfBirth ? 'text-gray-900' : 'text-gray-400'}`}
            >
              {data.dateOfBirth || 'mm/dd/yyyy'}
            </Text>
            <Ionicons name="calendar-outline" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Gender Select */}
        <View className="mb-4">
          <View className="flex-row items-center mb-2 gap-1">
            <Text className="text-xs font-bold text-secondary-500 uppercase tracking-wider">
              Gender
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => setShowGenderModal(true)}
            className="w-full px-4 py-3.5 border border-secondary-200 rounded-xl bg-white flex-row justify-between items-center"
          >
            <Text
              className={`text-base ${data.gender ? 'text-gray-900' : 'text-gray-400'}`}
            >
              {data.gender
                ? GENDER_OPTIONS.find(g => g.value === data.gender)?.label
                : 'Select gender'}
            </Text>
            <Ionicons name="chevron-down" size={20} color="#6b7280" />
          </TouchableOpacity>
        </View>

        {/* Date Picker Modal */}
        {showDatePicker && (
          <>
            {Platform.OS === 'ios' ? (
              <Modal
                visible={showDatePicker}
                transparent
                animationType="fade"
                onRequestClose={() => setShowDatePicker(false)}
              >
                <TouchableOpacity
                  activeOpacity={1}
                  onPress={handleCloseDatePicker}
                  className="flex-1 bg-black/50 justify-center items-center p-6"
                >
                  <View
                    className="bg-white w-full rounded-2xl p-4 shadow-xl"
                    onStartShouldSetResponder={() => true}
                  >
                    <Text className="text-lg font-bold text-gray-900 mb-4 text-center">
                      Select Date of Birth
                    </Text>
                    <DateTimePicker
                      value={getSelectedDate()}
                      mode="date"
                      display="spinner"
                      maximumDate={new Date()}
                      onChange={(event, date) => {
                        if (date) {
                          setTempDate(date);
                        }
                        if (Platform.OS === 'ios') {
                          if (event.type === 'dismissed') {
                            handleCloseDatePicker();
                          }
                        }
                      }}
                      style={DATE_PICKER_STYLE}
                    />
                    <View className="flex-row gap-3 mt-4">
                      <TouchableOpacity
                        onPress={handleCloseDatePicker}
                        className="flex-1 py-3 border border-gray-300 rounded-xl"
                      >
                        <Text className="text-center text-base text-gray-700 font-semibold">
                          Cancel
                        </Text>
                      </TouchableOpacity>
                      <TouchableOpacity
                        onPress={() => {
                          onUpdate({
                            dateOfBirth: formatDate(getSelectedDate()),
                          });
                          handleCloseDatePicker();
                        }}
                        className="flex-1 py-3 bg-orange-500 rounded-xl"
                      >
                        <Text className="text-center text-base text-white font-semibold">
                          Done
                        </Text>
                      </TouchableOpacity>
                    </View>
                  </View>
                </TouchableOpacity>
              </Modal>
            ) : (
              <DateTimePicker
                value={getSelectedDate()}
                mode="date"
                display="default"
                maximumDate={new Date()}
                onChange={(event, date) => {
                  if (event.type === 'set' && date) {
                    onUpdate({ dateOfBirth: formatDate(date) });
                  }
                  handleCloseDatePicker();
                }}
              />
            )}
          </>
        )}

        {/* Country Code Modal */}
        <Modal
          visible={showCountryModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowCountryModal(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowCountryModal(false)}
            className="flex-1 bg-black/50 justify-center items-center p-6"
          >
            <View className="bg-white w-full rounded-2xl p-4 shadow-xl max-h-[80%]">
              <Text className="text-lg font-bold text-gray-900 mb-4 text-center">
                Select Country
              </Text>
              <View className="max-h-[400px]">
                {COUNTRY_OPTIONS.map(option => (
                  <TouchableOpacity
                    key={`${option.code}-${option.country}`}
                    onPress={() => {
                      onUpdate({ countryCode: option.code });
                      setShowCountryModal(false);
                    }}
                    className="py-4 border-b border-gray-100 last:border-0 flex-row items-center justify-between"
                  >
                    <Text className="text-base text-gray-900">
                      {option.flag} {option.country}
                    </Text>
                    <Text
                      className={`text-base ${data.countryCode === option.code ? 'text-orange-500 font-semibold' : 'text-gray-500'}`}
                    >
                      {option.code}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </TouchableOpacity>
        </Modal>

        {/* Gender Modal */}
        <Modal
          visible={showGenderModal}
          transparent
          animationType="fade"
          onRequestClose={() => setShowGenderModal(false)}
        >
          <TouchableOpacity
            activeOpacity={1}
            onPress={() => setShowGenderModal(false)}
            className="flex-1 bg-black/50 justify-center items-center p-6"
          >
            <View className="bg-white w-full rounded-2xl p-4 shadow-xl">
              <Text className="text-lg font-bold text-gray-900 mb-4 text-center">
                Select Gender
              </Text>
              {GENDER_OPTIONS.map(option => (
                <TouchableOpacity
                  key={option.value}
                  onPress={() => {
                    onUpdate({ gender: option.value });
                    setShowGenderModal(false);
                  }}
                  className="py-4 border-b border-gray-100 last:border-0"
                >
                  <Text
                    className={`text-center text-base ${data.gender === option.value ? 'text-orange-500 font-semibold' : 'text-gray-700'}`}
                  >
                    {option.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </TouchableOpacity>
        </Modal>
      </View>
    </View>
  );
}
