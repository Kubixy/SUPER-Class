import React, { useState } from "react";
import { Icon } from "semantic-ui-react";
import BasicModal from "../../Modal/BasicModal";
import AskForSaveNavBar from "../../Modal/Functions/AskForSaveNavBar";
import { useUserTools } from "../../../context/UserToolsProvider";

import "./NavBar.scss";

export default function NavBar(props) {
  const { render, allowEdit, totalUsers } = props;

  const {
    endClassCallback,
    idClass,
    setManagment,
    managementON,
    classFound,
    data,
    newData,
    setNewData,
  } = useUserTools();

  const [showModal, setShowModal] = useState(false);

  return (
    <div className="navBar">
      <div className="navBar__left">
        <Icon
          name="hand point left"
          size="big"
          circular="true"
          onClick={() => {
            endClassCallback();
          }}
        />
        <Icon
          name="refresh"
          size="big"
          circular="true"
          onClick={() => {
            render();
          }}
        />
        {allowEdit && (
          <Icon
            name="edit"
            size="big"
            circular="true"
            onClick={() => {
              if (!newData) setShowModal(true);
              else {
                setManagment(!managementON);
                render();
              }
            }}
          />
        )}
      </div>
      <div className="navBar__center">
        <Icon name="slideshare" size="huge" />
        <h1>{idClass}</h1>
      </div>
      <div className="navBar__right">
        <Icon name="users" size="big" />
        <h1>{totalUsers}</h1>
      </div>
      {
        <BasicModal show={showModal} setShow={setShowModal} title="Warning">
          {
            <AskForSaveNavBar
              setShowModal={setShowModal}
              classFound={classFound}
              data={data}
              setManagment={setManagment}
              setNewData={setNewData}
              render={render}
            />
          }
        </BasicModal>
      }
    </div>
  );
}
