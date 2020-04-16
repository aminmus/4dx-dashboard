import React, { useState } from 'react';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import PropTypes from 'prop-types';
import ClientDetails from './ClientDetails';
import InputClientTitle from './elements/editMode/InputClientTitle';

const Details = ({ clients, editMode }) => {
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  return (
    <div className="mt-3">
      {clients.map(client => (
        <ClientDetails key={client.id} client={client} />
      ))}
      {editMode && (
        <div>
          {isEditingTitle ? (
            <InputClientTitle setIsEditingTitle={setIsEditingTitle} />
          ) : (
            <Button onClick={() => setIsEditingTitle(true)} className="px-0">
              <AddCircleIcon className="mr-2 text-warning" />
              Add New Client
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

Details.defaultProps = {
  clients: []
};

Details.propTypes = {
  editMode: PropTypes.bool.isRequired,
  clients: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = state => ({
  editMode: state.editMode.editModeEnabled
});

export default connect(mapStateToProps, null)(Details);
