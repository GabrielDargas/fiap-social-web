function Button({ newAnswer }) {
  return newAnswer.description.length > 10 ? (
    <button>Enviar</button>
  ) : (
    <span>A resposta deve conter ao mínimo 10 caracteres</span>
  );
}

export default Button;
