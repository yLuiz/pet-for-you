import IDontKnowPet from "../../../assets/img/pet-nao-sei.png";

export default function PetNotFound({
  imgWidth = 300,
  paragraph = "Pet não encontrado",
}) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "100%",
          justifyContent: "center",
          userSelect: 'none'
        }}
      >
        <img width={imgWidth} src={IDontKnowPet} alt="Pets não encontrados" />
      </div>
      <p>{paragraph}</p>
    </div>
  );
}
