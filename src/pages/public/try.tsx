import Cover from "../../components/cover/cover";
import Navbar from "../../components/navbar/Navbar";
import Wave from "../../components/wave/Wave";

function TryComp() {
  return (
    <>
      <Wave pos1={"absolute"} pos2={"absolute"} pos3={"absolute"} />
      <Navbar />
      <Cover
        title="Try"
        highlight="this"
        description="Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid fuga nemo similique ullam maiores dolor cupiditate, repudiandae, voluptates facere mollitia aperiam earum, ad amet aliquam?"
        linkTo="/consumo"
        linkText="touch this button"
        imageUrl="src/assets/img/undraw_data_re_80ws.svg"
        imageAlt="Cover"
      />
    </>
  );
}

export default TryComp;
