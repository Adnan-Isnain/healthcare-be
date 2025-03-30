import { PrismaClient, Role } from '@prisma/client';

const prisma = new PrismaClient();

// Helper function to generate a formatted UUID-like patient ID
function generatePatientId() {
  return `P${Math.random().toString(36).substring(2, 8).toUpperCase()}`;
}

async function main() {
  // Create Treatment Options
  const treatmentOptions = [
    { name: 'Blood Test', slug: 'blood-test' },
    { name: 'X-Ray', slug: 'x-ray' },
    { name: 'Ultrasound', slug: 'ultrasound' },
    { name: 'CT Scan', slug: 'ct-scan' },
    { name: 'MRI', slug: 'mri' },
    { name: 'Physical Therapy', slug: 'physical-therapy' },
    { name: 'Dental Checkup', slug: 'dental-checkup' },
    { name: 'Eye Examination', slug: 'eye-examination' },
    { name: 'Vaccination', slug: 'vaccination' },
    { name: 'Surgery', slug: 'surgery' },
  ];

  console.log('Creating treatment options...');
  for (const option of treatmentOptions) {
    await prisma.treatmentOption.upsert({
      where: { slug: option.slug },
      update: {},
      create: option,
    });
  }

  // Create Medications
  const medications = [
    { name: 'Paracetamol', slug: 'paracetamol' },
    { name: 'Amoxicillin', slug: 'amoxicillin' },
    { name: 'Ibuprofen', slug: 'ibuprofen' },
    { name: 'Aspirin', slug: 'aspirin' },
    { name: 'Omeprazole', slug: 'omeprazole' },
    { name: 'Metformin', slug: 'metformin' },
    { name: 'Lisinopril', slug: 'lisinopril' },
    { name: 'Amlodipine', slug: 'amlodipine' },
    { name: 'Atorvastatin', slug: 'atorvastatin' },
    { name: 'Metronidazole', slug: 'metronidazole' },
  ];

  console.log('Creating medications...');
  for (const medication of medications) {
    await prisma.medication.upsert({
      where: { slug: medication.slug },
      update: {},
      create: medication,
    });
  }

  // Create users with different roles
  console.log('Creating users with different roles...');
  const users = [
    {
      email: 'admin@example.com',
      password: '$2a$10$2IUn5BxhgVLbsjcB0cDFS.MCix77cU0ChPkoknXTZPIUSClCaKvrO', // Password: admin123
      name: 'Admin User',
      role: Role.ADMIN,
    },
    {
      email: 'doctor@example.com',
      password: '$2a$10$uYPGzT9jaZH1F8/RDeV2feZLjmNlRU/UH6kLa4fC78vKUhOmlSg7K', // Password: doctor123
      name: 'Dr. John Smith',
      role: Role.DOCTOR,
    },
    {
      email: 'nurse@example.com',
      password: '$2a$10$tychDStBx8TwUBerjGol0eSZ8q9FSnCH44fuaz4xOH8lalneVUuQG', // Password: nurse12
      name: 'Nurse Sarah',
      role: Role.NURSE,
    },
    {
      email: 'staff@example.com',
      password: '$2a$10$iHkl2ydhAafLIsnrwRb.8.iLa.u33ApZP7WF6SY3luzMs4Xsk0QYm', // Password: staff123
      name: 'Staff Member',
      role: Role.STAFF,
    },
  ];

  for (const userData of users) {
    await prisma.user.upsert({
      where: { email: userData.email },
      update: {},
      create: userData,
    });
  }

  // Create Dummy Patients with treatments
  const patients = [
    { name: 'John Doe', patientId: generatePatientId() },
    { name: 'Jane Smith', patientId: generatePatientId() },
    { name: 'Robert Johnson', patientId: generatePatientId() },
    { name: 'Mary Williams', patientId: generatePatientId() },
    { name: 'David Brown', patientId: generatePatientId() },
    { name: 'Sarah Davis', patientId: generatePatientId() },
    { name: 'Michael Wilson', patientId: generatePatientId() },
    { name: 'Lisa Anderson', patientId: generatePatientId() },
    { name: 'James Taylor', patientId: generatePatientId() },
    { name: 'Jennifer Martinez', patientId: generatePatientId() },
  ];

  console.log('Creating patients and their treatments...');
  for (const patientData of patients) {
    const patient = await prisma.patient.create({
      data: patientData,
    });

    // Create 1-3 random treatments for each patient
    const numTreatments = Math.floor(Math.random() * 3) + 1;
    for (let i = 0; i < numTreatments; i++) {
      const randomTreatmentOptions = treatmentOptions
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 3) + 1)
        .map(t => t.slug);

      const randomMedications = medications
        .sort(() => Math.random() - 0.5)
        .slice(0, Math.floor(Math.random() * 3) + 1)
        .map(m => m.slug);

      // Randomly assign a doctor to the treatment
      const doctor = await prisma.user.findFirst({
        where: { role: Role.DOCTOR },
      });

      if (doctor) {
        await prisma.treatment.create({
          data: {
            date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000), // Random date within last 30 days
            treatmentOptions: randomTreatmentOptions,
            medications: randomMedications,
            costOfTreatment: Math.floor(Math.random() * 1000) + 100, // Random cost between 100 and 1100
            patientId: patient.id,
            userId: doctor.id,
          },
        });
      }
    }
  }

  console.log('Seed data created successfully');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  }); 