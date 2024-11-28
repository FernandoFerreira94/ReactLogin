import React from "react";
import PropTypes from "prop-types";
import { ContainerLoading } from "./styled";

export default function Loading({ isLoading = false, texto }) {
  if (!isLoading) return <></>;
  return (
    <ContainerLoading>
      <div></div>
      <span>{texto}...</span>
    </ContainerLoading>
  );
}

Loading.propTypes = {
  isLoading: PropTypes.bool,
};
