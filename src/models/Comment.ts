import { User } from './User';

export interface Comment {
  _id?: string;
  _user: User;
  _reference: string;
  onModel: string;
  text: string;
  updatedAt?: string;
  createdAt?: string;
}

export interface CommentToCreate {
  _user: string; // El id del usuario
  _reference: string; // El id del itinerario o actividad
  onModel: string; // El modelo al que pertenece el comentario (itinerary o activity)
  text: string;
}
