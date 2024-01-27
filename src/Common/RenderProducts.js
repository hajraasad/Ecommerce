const RenderProducts = (props) => {
  const {
    list = [],
    increment = () => {},
    decrement = () => {},
    display = () => {},
  } = props;

  return (
    <div>
      {list.map((item) => {
        return (
          <div>
            <img src={item.image} style={{ height: 80, width: 50 }} />
            {item.description}
            <p>Price: {item.price}</p>
            <button onClick={() => decrement(item)}>-</button>
            <p>Quantity:{display(item)}</p>
            <button onClick={() => increment(item)}>+</button>
          </div>
        );
      })}
    </div>
  );
};
export default RenderProducts;
