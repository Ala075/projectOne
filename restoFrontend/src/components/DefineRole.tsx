export const defineRole = (role) => {
    switch (role) {
      case 1000:
        return "User";
      case 2000:
        return "Customer";
      case 3000:
        return "Provider";
      case 4000:
        return "Chef";
      case 5000:
        return "Caissier";
      case 7000:
        return "Superviseur";
      case 9000:
        return "Admin";
      default:
        return "Guest";
    }
  };
  