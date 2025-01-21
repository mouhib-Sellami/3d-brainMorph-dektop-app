import { Patient } from "../Patient";

interface PatientState extends BaseState {
    patients: Array<Patient>;
    selectedPatient: Patient | null;
}