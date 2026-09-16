/**
 * CERTIFICATIONS, FORMATIONS ET BADGES.
 *
 * Pour ajouter une certification : ajouter un objet dans le tableau.
 * Seuls `name`, `issuer` et `date` sont obligatoires.
 * Placer les certificats PDF dans public/documents/ (après vérification CONTENT-SAFETY.md).
 *
 * Tableau vide = la section affiche un état "à venir" propre.
 */

export interface Certification {
  name: string;
  /** Organisme (ex. "Cisco Networking Academy"). */
  issuer: string;
  /** Date d'obtention, AAAA-MM ou AAAA-MM-JJ. */
  date: string;
  /** Type : certification | formation | badge */
  type?: 'certification' | 'formation' | 'badge';
  description?: string;
  /** Lien officiel de vérification. */
  url?: string;
  /** Chemin public du certificat (ex. "/documents/certificat-xxx.pdf"). */
  pdf?: string;
  /** Statut : obtenue (défaut) | en-cours | prevue */
  status?: 'obtenue' | 'en-cours' | 'prevue';
}

export const certifications: Certification[] = [
  // Exemple (à supprimer / remplacer) :
  // {
  //   name: 'CCNA: Introduction to Networks',
  //   issuer: 'Cisco Networking Academy',
  //   date: '2026-05',
  //   type: 'badge',
  //   description: 'Fondamentaux des réseaux : modèle OSI, adressage IP, commutation.',
  //   url: 'https://www.credly.com/badges/...',
  //   pdf: '/documents/ccna-itn.pdf',
  // },
];
