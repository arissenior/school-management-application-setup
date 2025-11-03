
export interface Student {
  id: string;
  firstName: string;
  lastName: string;
  dateOfBirth: string;
  email: string;
  phone: string;
  address: string;
  parentName: string;
  parentPhone: string;
  parentEmail: string;
  enrollmentDate: string;
  photoUrl?: string;
  createdAt: string;
}

export type StudentFormData = Omit<Student, 'id' | 'createdAt'>;