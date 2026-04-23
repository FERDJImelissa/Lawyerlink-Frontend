# ⚖️ Avocat-Link : Extranet Juridique Cloud

## 🚀 Présentation
Avocat-Link est une plateforme de mise en relation entre clients et avocats, conçue pour simplifier les consultations juridiques. Le projet illustre une architecture moderne **Serverless** utilisant le paradigme **Build & Ship**.

---

## 🛠️ Mapping Technique (Thème Juridique)

| Élément | Description dans Avocat-Link |
| :--- | :--- |
| **Table A (Utilisateurs)** | `profiles` : Gère les clients et les avocats via Supabase Auth. |
| **Table B (Ressources)** | `lawyers` : Liste exhaustive des avocats disponibles avec leurs spécialités. |
| **Table C (Interactions)** | `consultations` : Table de jointure reliant un client à un avocat pour une demande spécifique. |
| **Storage (Fichiers)** | `evidence-files` : Dossier de preuve (PDF/Images) uploadé lors de la demande. |

---

## 🏗️ Analyse d'Architecture (Rapport Architecte)

### 1. Logique Financière : CAPEX vs OPEX
L'utilisation du combo **Vercel + Supabase** est stratégiquement plus logique pour un lancement de projet (MVP) qu'un serveur classique pour plusieurs raisons :
- **Réduction du CAPEX (Capital Expenditure)** : Contrairement à un centre de données physique, nous n'avons aucun investissement initial lourd (achat de serveurs, racks, climatisation). Le coût d'entrée est de 0€.
- **Optimisation de l'OPEX (Operating Expenditure)** : Nous payons uniquement ce que nous consommons (Modèle *Pay-as-you-go*). Si le trafic est faible au début, la facture reste minimale. Cela transforme des coûts fixes en coûts variables ajustables.

### 2. Scalabilité vs Data Center Physique
Vercel gère la scalabilité de manière **transparente et automatique** via une infrastructure Serverless :
- **Auto-scaling** : Là où un Data Center physique nécessite l'ajout manuel de RAM ou de nouveaux serveurs (provisioning) pour absorber un pic de charge, Vercel déploie instantanément des instances supplémentaires (Edge Functions) à travers le monde.
- **Maintenance** : Nous déléguons toute la gestion de la couche physique (climatisation, redondance électrique, sécurité incendie) au fournisseur cloud, nous permettant de nous concentrer exclusivement sur le code ("Vibe Programming").

### 3. Données Structurées vs Non-structurées
Dans notre application :
- **Données Structurées** : Les tables `profiles`, `lawyers` et `consultations` stockées dans PostgreSQL (Supabase). Elles suivent un schéma strict, avec des relations (clés étrangères) et des types de données définis (UUID, TEXT, TIMESTAMP).
- **Données Non-structurées** : Les fichiers PDF ou images de preuves stockés dans **Supabase Storage**. Ces données n'ont pas de format interne prévisible pour la base de données et sont stockées en tant que "blobs" ou fichiers binaires, référencés uniquement par une URL dans la table structurée.

---

## 🛠️ Installation & Déploiement
1. Clonez le dépôt.
2. `npm install`
3. Configurez vos variables d'environnement (`VITE_SUPABASE_URL` & `VITE_SUPABASE_ANON_KEY`).
4. `npm run dev`

---
**Binôme :** [Noms des étudiants]
**Thème :** Juridique ("Avocat-Link")
