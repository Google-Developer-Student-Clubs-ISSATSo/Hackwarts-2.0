import { connectToDatabase } from "@/lib/mongodb";
import { Challenge } from "@/app/models/Challenge";
import { Submission } from "@/app/models/Submission";
import { Team } from "@/app/models/Team";
const seedDataBase = async () => {
  await connectToDatabase();
  const challenges = await Challenge.insertMany([
    {
      name: "Transformez l'éducation avec 9antra Kids",
      sponsor_name: "9antra",
      description: `Comment rendre l'apprentissage des compétences numériques accessible,
        engageant et adapté aux enfants, tout en répondant aux défis de concentration et de
        motivation dans un environnement en ligne`,
      prize: `1ère équipe : 1500 DT pour des formations et des stages chez 9antra.\n
              2ème équipe : 500 DT pour des stages et des formations chez 9antra.`,
      link: "https://drive.google.com/file/d/13cLoCvn4oUXSApF9B8pZ_h7viRnP2qrV/view?usp=sharing",
    },
    {
      name: "Plateforme de Gestion Centralisée des Réclamations",
      sponsor_name: "ClassQuiz",
      description:
        `Ce challenge vise à développer une plateforme qui centralise les réclamations des clients provenant de différents canaux de communication et qui facilite leur gestion via un système de tickets.`,
      prize: "Stages PFE ou d'été : Tous les membres de l'équipe gagnante auront l'opportunité ",
      link: "https://docs.google.com/document/d/1Ndb0lCoRjwBmGnGywsv4A2W05ZJLODos/edit?usp=sharing&ouid=112988318502935615412&rtpof=true&sd=true",
    },
    {
      name: `Application Web de Gestion des Groupes du Club Young Engineers`,
      sponsor_name: "Young Engineers",
      description: `Améliorer l'organisation et la gestion des groupes une application web (interface administrateur)`,
      prize: `• 300 TND pour le meilleur projet à l'issue du hackathon.\n
              • 700 TND supplémentaires si le projet est finalisé avant la fin décembre.`,
      link: "https://drive.google.com/file/d/1gCZSJnKpaYaj_hVE2stwBliI70yoEwQb/view?usp=sharing",
    },
  ]);
  console.log("Seeded Challenges:", challenges);
  // const teams = await Team.insertMany([
  //   {
  //     name: "Team Gryffindor",
  //     leader_name: "Harry Potter",
  //     leader_email: "harry@hogwarts.edu",
  //     members: [
  //       { name: "Hermione Granger", email: "hermione@hogwarts.edu" },
  //       { name: "Ron Weasley", email: "ron@hogwarts.edu" },
  //     ],
  //     house: "Gryffindor",
  //     selected_challenges: [challenges[0]._id, challenges[1]._id],
  //   },
  //   {
  //     name: "Team Ravenclaw",
  //     leader_name: "Luna Lovegood",
  //     leader_email: "luna@hogwarts.edu",
  //     members: [
  //       { name: "Cho Chang", email: "cho@hogwarts.edu" },
  //       { name: "Padma Patil", email: "padma@hogwarts.edu" },
  //     ],
  //     house: "Ravenclaw",
  //     selected_challenges: [challenges[1]._id, challenges[2]._id],
  //   },
  // ]);
  // console.log("Seeded Teams:", teams);

  // Seed the submissions
  // const submissions = await Submission.insertMany([
  //   {
  //     team_id: teams[0]._id,
  //     challenge_id: challenges[0]._id,
  //     submission_url: "https://submission1.example.com",
  //   },
  //   {
  //     team_id: teams[0]._id,
  //     challenge_id: challenges[1]._id,
  //     submission_url: "https://submission2.example.com",
  //   },
  //   {
  //     team_id: teams[1]._id,
  //     challenge_id: challenges[1]._id,
  //     submission_url: "https://submission3.example.com",
  //     deployement_url: "https://deployment3.example.com",
  //   },
  //   {
  //     team_id: teams[1]._id,
  //     challenge_id: challenges[2]._id,
  //     submission_url: "https://submission4.example.com",
  //   },
  // ]);

  // console.log("Seeded Submissions:", submissions);
};

export default seedDataBase;
seedDataBase();
