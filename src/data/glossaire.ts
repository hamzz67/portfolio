/**
 * GLOSSAIRE DE LA VEILLE — rendu en liste de définitions sur /veille/.
 *
 * Les termes sont regroupés par thème pour que la liste reste lisible : un
 * glossaire de trente-quatre entrées à plat ne se parcourt pas.
 * Ordre d'affichage = ordre de ce fichier.
 */

export interface Terme {
  terme: string;
  definition: string;
}

export interface GroupeGlossaire {
  id: string;
  label: string;
  termes: Terme[];
}

export const glossaire: GroupeGlossaire[] = [
  {
    id: 'exposition',
    label: 'Exposition',
    termes: [
      {
        terme: 'Équipement de bordure',
        definition:
          'Équipement à la frontière entre réseau interne et Internet : pare-feu, routeur, concentrateur VPN, passerelle d’accès. Exposé par nature.',
      },
      {
        terme: 'Surface d’attaque',
        definition:
          'Ensemble des points par lesquels un attaquant peut tenter d’entrer. La réduire, c’est fermer, désactiver, masquer.',
      },
      { terme: 'Exposition', definition: 'Fait d’être joignable depuis Internet.' },
    ],
  },
  {
    id: 'vulnerabilites',
    label: 'Vulnérabilités et gravité',
    termes: [
      { terme: 'CVE', definition: 'Identifiant mondial unique d’une vulnérabilité (CVE-ANNÉE-NUMÉRO).' },
      {
        terme: 'CVSS',
        definition:
          'Score de gravité de 0 à 10 ; « critique » à partir de 9. Il mesure la gravité théorique, pas l’urgence réelle.',
      },
      { terme: 'Zero-day', definition: 'Vulnérabilité exploitée avant qu’un correctif n’existe.' },
      {
        terme: 'Exploitation active',
        definition: 'Des attaques réelles utilisant la faille sont observées (in the wild).',
      },
      {
        terme: 'Preuve de concept',
        definition:
          'Code public démontrant qu’une faille est exploitable. Sa publication accélère les attaques.',
      },
    ],
  },
  {
    id: 'autorites',
    label: 'Autorités et publications',
    termes: [
      {
        terme: 'Avis (CERT-FR)',
        definition: 'Signale des vulnérabilités et leurs correctifs. Plus d’un millier par an.',
      },
      {
        terme: 'Alerte (CERT-FR)',
        definition:
          'Niveau supérieur : faille jugée particulièrement grave, souvent déjà exploitée. Dix à quinze par an.',
      },
      {
        terme: 'KEV (CISA)',
        definition:
          'Known Exploited Vulnerabilities : catalogue officiel américain des vulnérabilités exploitées, avec date d’ajout et échéance de correction imposée aux agences fédérales.',
      },
      {
        terme: 'CERT-FR',
        definition:
          'Centre gouvernemental français de veille, d’alerte et de réponse aux attaques informatiques, rattaché à l’ANSSI.',
      },
      { terme: 'ANSSI', definition: 'Agence nationale de la sécurité des systèmes d’information.' },
      { terme: 'CISA', definition: 'Agence américaine de cybersécurité, éditrice du catalogue KEV.' },
    ],
  },
  {
    id: 'attaques',
    label: 'Techniques d’attaque',
    termes: [
      {
        terme: 'RCE',
        definition: 'Remote Code Execution : exécution de code à distance. L’un des impacts les plus graves.',
      },
      {
        terme: 'SSRF',
        definition:
          'Server-Side Request Forgery : on fait émettre au serveur des requêtes qu’il est seul autorisé à faire, pour atteindre des services internes.',
      },
      {
        terme: 'Dépassement mémoire',
        definition:
          'Écriture au-delà de la zone mémoire prévue. Peut faire planter le service ou permettre d’exécuter du code.',
      },
      {
        terme: 'Traversée de répertoire',
        definition: 'Utiliser ../ pour sortir du dossier autorisé et atteindre d’autres fichiers.',
      },
      {
        terme: 'Identifiants codés en dur',
        definition: 'Comptes et mots de passe inscrits dans le produit, identiques chez tous les clients.',
      },
      {
        terme: 'Webshell',
        definition: 'Script déposé sur un serveur compromis, offrant un accès à distance par requêtes web.',
      },
      {
        terme: 'Mouvement latéral',
        definition: 'Déplacement d’une machine compromise vers d’autres, à l’intérieur du réseau.',
      },
      { terme: 'Déni de service', definition: 'Attaque qui rend un service indisponible.' },
      {
        terme: 'Rançongiciel',
        definition:
          'Maliciel qui chiffre ou vole les données contre rançon. Qilin en est un exemple actif sur la période.',
      },
    ],
  },
  {
    id: 'acces-distant',
    label: 'Accès distant',
    termes: [
      {
        terme: 'VPN',
        definition: 'Tunnel chiffré entre un poste distant et le réseau d’entreprise (IPsec ou SSL/TLS).',
      },
      {
        terme: 'IKE (IKEv1, IKEv2)',
        definition:
          'Protocole d’échange de clés d’IPsec. IKEv1 est déprécié : le laisser actif est une dette technique.',
      },
      {
        terme: 'Passerelle d’accès',
        definition:
          'Équipement qui authentifie et filtre les accès distants (SonicWall SMA, F5 BIG-IP APM, Citrix NetScaler Gateway).',
      },
      {
        terme: 'SAML',
        definition: 'Protocole d’authentification fédérée, base de l’authentification unique (SSO).',
      },
      { terme: 'SD-WAN', definition: 'Pilotage logiciel de l’interconnexion des sites d’une entreprise.' },
    ],
  },
  {
    id: 'defense',
    label: 'Défense',
    termes: [
      {
        terme: 'Zero Trust',
        definition:
          'Modèle qui réduit la confiance implicite : chaque accès est vérifié, même depuis l’intérieur. Complète la défense périmétrique sans la remplacer.',
      },
      { terme: 'MFA', definition: 'Authentification multifacteur : mot de passe plus code ou clé physique.' },
      {
        terme: 'Contrôle de posture',
        definition:
          'Vérification de l’état du poste (correctifs, antivirus, chiffrement) avant d’autoriser la connexion.',
      },
      {
        terme: 'Segmentation',
        definition: 'Découpage du réseau pour limiter la propagation. VLAN et ACL en sont les outils de base.',
      },
      { terme: 'Moindre privilège', definition: 'Chaque compte n’a que les droits strictement nécessaires.' },
      {
        terme: 'EDR',
        definition:
          'Endpoint Detection and Response : agent de détection installé sur les postes et les serveurs. Ne peut pas être installé sur une passerelle.',
      },
      {
        terme: 'Indicateur de compromission',
        definition:
          'Trace (fichier, ligne de journal, adresse IP) permettant de vérifier si un équipement a été attaqué.',
      },
    ],
  },
];

export const totalTermes = glossaire.reduce((n, g) => n + g.termes.length, 0);
