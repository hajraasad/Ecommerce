import ButtonComponent from "./ButtonComponent";

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
            <ButtonComponent onClick={()=>decrement(item)} text={'-'}/>
            <p>Quantity:{display(item)}</p>
            <ButtonComponent onClick={()=>increment(item)} text={'+'}/>
          </div>
        );
      })}
    </div>
  );
};
export default RenderProducts;
