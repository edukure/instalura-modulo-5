/* eslint-disable react/jsx-props-no-spreading */
import React from 'react';
import PropTypes from 'prop-types';
import get from 'lodash/get';

import Box from '../../foundation/layout/Box';
import Footer from '../../commons/Footer';
import Menu from '../../commons/Menu';
import Modal from '../../commons/Modal';
import FormCadastro from '../../patterns/FormCadastro';
import SEO from '../../commons/SEO';

import { WebsitePageContext } from './context';

export { WebsitePageContext } from './context';

const WebsitePageWrapper = ({
  children, seoProps, pageBoxProps, menuProps, messages,
}) => {
  const [isModalOpen, setModalState] = React.useState(false);

  return (
    <WebsitePageContext.Provider
      value={{
        toggleModalCadastro: () => {
          setModalState(!isModalOpen);
        },
        getCMSContent: (cmsKey) => get(messages, cmsKey),
      }}
    >

      <SEO {...seoProps} />

      <Box display="flex" flex="1" flexDirection="column" {...pageBoxProps}>
        <Modal
          isOpen={isModalOpen}
          onClose={() => {
            setModalState(false);
          }}
        >
          {(propsDoModal) => (
            <FormCadastro propsDoModal={propsDoModal} />
          )}
        </Modal>

        {menuProps.display
        && (
        <Menu
          onCadastrarClick={() => setModalState(true)}
        />
        )}
        {children}
        <Footer />
      </Box>
    </WebsitePageContext.Provider>
  );
};

WebsitePageWrapper.propTypes = {
  children: PropTypes.node.isRequired,
  seoProps: PropTypes.shape({
    headTitle: PropTypes.string,
  }),
  pageBoxProps: PropTypes.shape({
    backgroundImage: PropTypes.string,
    backgroundRepeat: PropTypes.string,
    backgroundPosition: PropTypes.string,
  }),
  menuProps: PropTypes.shape({
    display: PropTypes.bool,
  }),
  // eslint-disable-next-line react/forbid-prop-types
  messages: PropTypes.object,
};

WebsitePageWrapper.defaultProps = {
  seoProps: {},
  pageBoxProps: {},
  menuProps: { display: true },
  messages: {},
};

export default WebsitePageWrapper;
