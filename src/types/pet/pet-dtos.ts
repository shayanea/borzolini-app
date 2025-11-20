import type { PetGender, PetSize, PetSpecies } from './pet-enums';
import type { Pet } from './pet-interfaces';

// DTOs for API requests
export interface CreatePetDto {
  name: string;
  species: PetSpecies;
  breed?: string;
  gender?: PetGender;
  date_of_birth?: string;
  weight?: number;
  size?: PetSize;
  color?: string;
  microchip_number?: string;
  is_spayed_neutered?: boolean;
  is_vaccinated?: boolean;
  medical_history?: string;
  behavioral_notes?: string;
  dietary_requirements?: string;
  allergies?: string[];
  medications?: string[];
  emergency_contact?: string;
  emergency_phone?: string;
  photo_url?: string;
}

export interface UpdatePetDto extends Partial<CreatePetDto> {
  id?: string;
  is_active?: boolean;
}

// API Response DTOs
export interface PetResponseDto {
  data: Pet;
  message: string;
  timestamp: string;
}

export interface PetsListResponseDto {
  data: Pet[];
  total: number;
  page: number;
  totalPages: number;
  message: string;
  timestamp: string;
}

export interface PetCreatedResponseDto {
  data: Pet;
  message: string;
  timestamp: string;
  id: string;
  createdAt: string;
}

export interface PetUpdatedResponseDto {
  data: Pet;
  message: string;
  timestamp: string;
  id: string;
  updatedAt: string;
  affectedRows: number;
}

export interface PetHealthSummaryResponseDto {
  data: {
    petId: string;
    petName: string;
    lastCheckup: string;
    nextVaccination: string;
    weightHistory: Array<{ date: string; weight: number }>;
    vaccinationStatus: Record<string, { status: string; nextDue: string }>;
    medicalAlerts: string[];
    upcomingAppointments: Array<{
      id: string;
      date: string;
      type: string;
      clinic: string;
    }>;
  };
  message: string;
  timestamp: string;
}

export interface PetVaccinationResponseDto {
  data: {
    petId: string;
    petName: string;
    vaccinations: Array<{
      id: string;
      name: string;
      date: string;
      nextDue: string;
      status: string;
      clinic: string;
      veterinarian: string;
    }>;
    upcomingVaccinations: Array<{
      name: string;
      dueDate: string;
      daysUntilDue: number;
    }>;
  };
  message: string;
  timestamp: string;
}

export interface PetMedicalHistoryResponseDto {
  data: {
    petId: string;
    petName: string;
    medicalRecords: Array<{
      id: string;
      date: string;
      type: string;
      diagnosis: string;
      treatment: string;
      veterinarian: string;
      clinic: string;
      notes: string;
    }>;
    medications: Array<{
      name: string;
      dosage: string;
      startDate: string;
      endDate: string;
      status: string;
    }>;
    allergies: string[];
    chronicConditions: string[];
  };
  message: string;
  timestamp: string;
}

export interface PetBehavioralAssessmentResponseDto {
  data: {
    petId: string;
    petName: string;
    assessmentDate: string;
    temperament: string;
    socialBehavior: {
      withHumans: string;
      withOtherDogs: string;
      withCats: string;
      withChildren: string;
    };
    trainingLevel: string;
    commands: string[];
    behavioralIssues: string[];
    recommendations: string[];
    nextAssessment: string;
  };
  message: string;
  timestamp: string;
}

