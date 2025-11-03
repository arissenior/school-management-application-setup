
import { useState } from 'react';
import { Student, StudentFormData } from '@/types/student';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import StudentForm from '@/components/students/StudentForm';
import { Plus, Search, Edit, Trash2, Mail, Phone } from 'lucide-react';

// Mock data
const mockStudents: Student[] = [
  {
    id: '1',
    firstName: 'Marie',
    lastName: 'Dubois',
    dateOfBirth: '2008-05-15',
    email: 'marie.dubois@email.com',
    phone: '0612345678',
    address: '12 Rue de la Paix, Paris',
    parentName: 'Jean Dubois',
    parentPhone: '0623456789',
    parentEmail: 'jean.dubois@email.com',
    enrollmentDate: '2023-09-01',
    createdAt: '2023-09-01T10:00:00Z',
  },
  {
    id: '2',
    firstName: 'Lucas',
    lastName: 'Martin',
    dateOfBirth: '2009-03-22',
    email: 'lucas.martin@email.com',
    phone: '0634567890',
    address: '45 Avenue des Champs, Lyon',
    parentName: 'Sophie Martin',
    parentPhone: '0645678901',
    parentEmail: 'sophie.martin@email.com',
    enrollmentDate: '2023-09-01',
    createdAt: '2023-09-01T10:00:00Z',
  },
  {
    id: '3',
    firstName: 'Emma',
    lastName: 'Bernard',
    dateOfBirth: '2008-11-08',
    email: 'emma.bernard@email.com',
    phone: '0656789012',
    address: '78 Boulevard Victor Hugo, Marseille',
    parentName: 'Pierre Bernard',
    parentPhone: '0667890123',
    parentEmail: 'pierre.bernard@email.com',
    enrollmentDate: '2023-09-01',
    createdAt: '2023-09-01T10:00:00Z',
  },
];

export default function StudentsPage() {
  const [students, setStudents] = useState<Student[]>(mockStudents);
  const [searchTerm, setSearchTerm] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStudent, setEditingStudent] = useState<Student | undefined>();

  const filteredStudents = students.filter(student =>
    `${student.firstName} ${student.lastName}`.toLowerCase().includes(searchTerm.toLowerCase()) ||
    student.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddStudent = (data: StudentFormData) => {
    const newStudent: Student = {
      ...data,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
    };
    setStudents(prev => [...prev, newStudent]);
    setIsDialogOpen(false);
  };

  const handleEditStudent = (data: StudentFormData) => {
    if (!editingStudent) return;
    
    setStudents(prev => prev.map(s => 
      s.id === editingStudent.id 
        ? { ...s, ...data }
        : s
    ));
    setEditingStudent(undefined);
    setIsDialogOpen(false);
  };

  const handleDeleteStudent = (id: string) => {
    if (confirm('Êtes-vous sûr de vouloir supprimer cet élève ?')) {
      setStudents(prev => prev.filter(s => s.id !== id));
    }
  };

  const openAddDialog = () => {
    setEditingStudent(undefined);
    setIsDialogOpen(true);
  };

  const openEditDialog = (student: Student) => {
    setEditingStudent(student);
    setIsDialogOpen(true);
  };

  const closeDialog = () => {
    setIsDialogOpen(false);
    setEditingStudent(undefined);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-foreground">Gestion des élèves</h1>
          <p className="text-muted-foreground mt-1">{students.length} élève(s) inscrit(s)</p>
        </div>
        <Button onClick={openAddDialog} className="gap-2">
          <Plus className="h-4 w-4" />
          Ajouter un élève
        </Button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Rechercher par nom ou email..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Students Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredStudents.map((student) => (
          <div key={student.id} className="bg-card rounded-lg border border-border p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-semibold text-lg">
                  {student.firstName[0]}{student.lastName[0]}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{student.firstName} {student.lastName}</h3>
                  <p className="text-sm text-muted-foreground">
                    {new Date().getFullYear() - new Date(student.dateOfBirth).getFullYear()} ans
                  </p>
                </div>
              </div>
              <div className="flex gap-1">
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => openEditDialog(student)}
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => handleDeleteStudent(student.id)}
                >
                  <Trash2 className="h-4 w-4 text-destructive" />
                </Button>
              </div>
            </div>

            <div className="space-y-2 text-sm">
              {student.email && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <span className="truncate">{student.email}</span>
                </div>
              )}
              {student.phone && (
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Phone className="h-4 w-4" />
                  <span>{student.phone}</span>
                </div>
              )}
            </div>

            <div className="mt-4 pt-4 border-t border-border">
              <p className="text-xs text-muted-foreground mb-1">Parent/Tuteur</p>
              <p className="text-sm font-medium text-foreground">{student.parentName}</p>
              <p className="text-sm text-muted-foreground">{student.parentPhone}</p>
            </div>
          </div>
        ))}
      </div>

      {filteredStudents.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Aucun élève trouvé</p>
        </div>
      )}

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>
              {editingStudent ? 'Modifier un élève' : 'Ajouter un élève'}
            </DialogTitle>
          </DialogHeader>
          <StudentForm
            student={editingStudent}
            onSubmit={editingStudent ? handleEditStudent : handleAddStudent}
            onCancel={closeDialog}
          />
        </DialogContent>
      </Dialog>
    </div>
  );
}