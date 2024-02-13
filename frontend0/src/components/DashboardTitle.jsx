const DashboardTitle = ({ title, addMethod }) => {
  return (
    <div
      style={{
        width: "100%",
        padding: "1rem .5rem",
        display: "flex",
        justifyContent: "space-between",
        backgroundColor: "#242424",
        color: "white",
        alignItems: "center",
        borderTopLeftRadius: "7px",
        borderTopRightRadius: "7px",
      }}
    >
      <p>All {title}:</p>
      <button
        style={{
          padding: ".5rem",
          backgroundColor: "gray",
          outline: "none",
          border: "none",
          borderRadius: "5px",
          cursor: "pointer",
        }}
        onClick={addMethod}
      >
        Add User
      </button>
    </div>
  );
};

export default DashboardTitle;
