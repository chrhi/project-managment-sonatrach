interface Member {
  firstName: string;
  lastName: string;
  email: string;
  id: string;
  image: string;
  role: "Admin" | "ProjectManager" | "TeamMember" | "Client";
}
