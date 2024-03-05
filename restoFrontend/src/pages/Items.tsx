import { IMAGE_URL } from "@/api/Config";
import { useRes } from "@/context/ResCtx";

const Items = () => {
  const { items } = useRes();

  return (
    <div className="dashboard__items">
      {items.map((item: any) => (
        <div className="dashboard__item" key={item._id}>
          <div className="img">
            <img src={IMAGE_URL + item.images[0]} alt={item.name} />
          </div>
          <div className="dashboard__item__details">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
            <p>{item.price} DT</p>
          </div>

          <div className="dashboard__item__actions">
            <button>Edit</button>
            <button>Delete</button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Items;
