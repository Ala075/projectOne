import { IMAGE_URL } from "@/api/Config";
import { useRes } from "@/context/ResCtx";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useEffect, useState, useCallback, useContext } from "react";
import { SelectLabel } from "@radix-ui/react-select";
import Header from "@/components/Header";
import { BasketContext } from "@/context/BasketContext";

const SearchProducts = () => {
  const { categories, items, setItem, item, filteredItems, setFilteredItems } =
    useRes();
  const { addToBasket } = useContext(BasketContext);
  const [selectedItems, setSelectedItems] = useState(items);
  const [images, setImages] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    if (filteredItems.length > 0) {
      setSelectedItems(filteredItems);
    } else {
      setSelectedItems(items);
    }
  }, [items, filteredItems]);

  useEffect(() => {
    if (item) {
      const filtered = item.images.filter((image) => image !== images[0]);
      setImages(filtered);
    }
    console.log(item);
  }, [item]);

  const handleSelect = (e) => {
    console.log(e.target.value);
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === "All") {
      setFilteredItems(items);
    } else {
      const filtered = items.filter((item) => item.category === category);
      setFilteredItems(filtered);
    }
  };

  const handleShowProduct = (product) => {
    setItem(product);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <Header />
      <div className="search__page">
        <div className="search__page__container">
          <div className="search__header">
            <div className="search__input">
              <input
                type="text"
                placeholder="Search for products"
                onChange={(e) => {
                  const search = e.target.value;
                  if (search === "") {
                    setFilteredItems(items);
                  } else {
                    const filtered = items.filter((item) =>
                      item.name.toLowerCase().includes(search.toLowerCase())
                    );
                    setFilteredItems(filtered);
                  }
                }}
              />
            </div>

            <div className="search__category">
              <Select>
                <SelectTrigger className="w-[180px] h-[100%]">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>

                <SelectContent>
                  <SelectGroup>
                    <SelectLabel>Category</SelectLabel>
                    <SelectItem value="All">All</SelectItem>
                    {categories.map((category) => (
                      <SelectItem key={category._id} value={category.name}>
                        {category.name}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {item && (
            <div className="search__item__info">
              <div className="item__info">
                <div className="main__image">
                  <img src={IMAGE_URL + item.images[0]} alt={item.name} />
                </div>

                <div className="search__item__content">
                  <h3>{item.name}</h3>
                  <p>{item.description}</p>
                  <p>{item.price} DT</p>

                  <div className="search__item__counter">
                    <button onClick={() => addToBasket(item)}>
                      Add to Cart
                    </button>
                  </div>
                </div>
              </div>
              {images && (
                <div className="sub__images">
                  {images.map((image, index) => (
                    <div className="sub__images__img" key={index}>
                      <img src={IMAGE_URL + image} alt={item.name} />
                    </div>
                  ))}
                  {images.map((image, index) => (
                    <div className="sub__images__img" key={index}>
                      <img src={IMAGE_URL + image} alt={item.name} />
                    </div>
                  ))}
                  {images.map((image, index) => (
                    <div className="sub__images__img" key={index}>
                      <img src={IMAGE_URL + image} alt={item.name} />
                    </div>
                  ))}
                  {images.map((image, index) => (
                    <div className="sub__images__img" key={index}>
                      <img src={IMAGE_URL + image} alt={item.name} />
                    </div>
                  ))}
                  {images.map((image, index) => (
                    <div className="sub__images__img" key={index}>
                      <img src={IMAGE_URL + image} alt={item.name} />
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          <h3>
            {selectedCategory === "All"
              ? "All Products"
              : `Selected Category: ${selectedCategory}`}
          </h3>
          <div className="search__content">
            {selectedItems.map((item) => (
              <div
                className="search__item"
                key={item._id}
                onClick={() => handleShowProduct(item)}
              >
                <div className="img">
                  <img src={IMAGE_URL + item.images[0]} alt={item.name} />
                </div>
                <h3>{item.name}</h3>
                <p>{item.description}</p>
                <p>{item.price} DT</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default SearchProducts;
