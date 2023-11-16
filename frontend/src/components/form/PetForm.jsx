import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import environment from "../../environment/environment";
import RoundedImage from "../layout/RoundedImage";
import formStyles from "./Form.module.css";
import Input from "./Input";
import Select from "./Select";

export default function PertForm({ createPet = false, handleSubmit, petData, btnText, loading }) {
  const [pet, setPet] = useState(petData || {});

  const [preview, setPreview] = useState([]);
  const colors = ["Branco", "Preto", "Cinza", "Caramelo", "Mesclado"];

  function onFileChange(e) {
    setPet({ ...pet, images: [...e.target.files] });
    setPreview([...e.target.files]);
  }

  function handleChange(e) {

    setPet({ ...pet, [e.target.name]: e.target.value });
  }

  function handleColor(e) {
    setPet({ ...pet, color: e.target.options[e.target.selectedIndex].text });
  }

  function handleFocusOutName(event) {
    event.target.value = event.target.value.trim();

    if(((/[^a-zA-Z\s]+/).test(event.target.value)) && event.target.value) {
      event.target.value = ''
      toast(`Insira apenas letras`, {
        type: "error",
      });
    }
  }

  function submit(event) {
    event.preventDefault();
    if (!pet.images?.length) {
      toast("Imagem é obrigatória!", {
        type: "error",
      });
      return;
    }

    if (!pet.color) {
      toast("Cor é obrigatória!", {
        type: "error",
      });
      return;
    }

    handleSubmit(pet);
  }

  return (
    <div className={formStyles.form_container}>
      <form onSubmit={submit}>
        <div className={formStyles.form_inputs}>
          <div className={formStyles.preview_pet_images}>
            {preview.length ? (
              preview.map((image, index) => (
                <RoundedImage
                  src={URL.createObjectURL(image)}
                  alt={pet.name}
                  key={`${pet.name}${index}`}
                />
              ))
            ) : pet.images ? (
              pet.images.map((image, index) => (
                <RoundedImage
                  src={`${environment.REACT_APP_API}/images/pets/${image}`}
                  alt={pet.name}
                  key={`${pet.name}${index}`}
                />
              ))
            ) : (
              <RoundedImage />
            )}
          </div>

          <Input
            text="Imagem"
            type="file"
            fileType="image"
            name="image"
            multiple={true}
            handleChange={onFileChange}
          />

          <Input
            handleFocusOut={handleFocusOutName}
            required={true}
            text="Nome"
            type="text"
            placeholder="Digite o nome"
            name="name"
            handleChange={handleChange}
            value={pet.name || ""}
          />

          <Input
            required={true}
            text="Idade (Meses)"
            type="number"
            placeholder="Digite a idade em meses"
            name="age"
            handleChange={handleChange}
            value={pet.age || ""}
          />

          <Input
            required={true}
            text="Peso (kg)"
            type="number"
            placeholder="Digite o peso"
            name="weight"
            handleChange={handleChange}
            value={pet.weight || ""}
          />

          <Select
            required={true}
            name="color"
            text="Seleciona a cor"
            value={pet.color || ""}
            options={colors}
            handleChange={handleColor}
          />

          <button disabled={loading} type="submit">
            {loading ? (
              <span className={formStyles.loader}></span>
            ) : (
              createPet ? "Cadastrar pet" : "Editar pet"
            )}
          </button>
          <Link className={formStyles.backButton} to="/pet/mypets">
            Voltar
          </Link>
        </div>
      </form>
    </div>
  );
}
