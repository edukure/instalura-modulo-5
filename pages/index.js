import React from 'react';
import Button from '../src/components/commons/Button';
import Box from '../src/components/foundation/layout/Box';
import Grid from '../src/components/foundation/layout/Grid';
import Text from '../src/components/foundation/Text';
import { WebsitePageContext } from '../src/components/wrappers/WebsitePage';
import websitePageHOC from '../src/components/wrappers/WebsitePage/hoc';

const HomeScreen = () => {
  const websitePageContext = React.useContext(WebsitePageContext);

  return (
    <Box display="flex" flex="1" flexDirection="column">

      <Grid.Container
        marginTop={{
          xs: '32px',
          md: '75px',
        }}
      >
        <Grid.Row>
          <Grid.Col
            value={{ xs: 12, md: 5 }}
            offset={{ xs: 0, md: 1 }}
            display="flex"
            alignItems="flex-start"
            flexDirection="column"
            justifyContent="center"
            marginBottom={{ xs: '40px', md: '0px' }}
          >
            {/* <Grid.Col value={5} offset={1}> */}
            <Text
              variant="title"
              tag="h1"
            // textAlign={'center'}
              textAlign={{
                xs: 'center',
                md: 'left',
              }}
            >
              Compartilhe momentos e conecte-se com amigos
            </Text>

            <Text
              variant="paragraph1"
              tag="p"
              textAlign={{
                xs: 'center',
                md: 'left',
              }}
            >
              Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum
              has been the industrys standard dummy text ever since the 1500s.
            </Text>

            <Button
              variant="primary.main"
              margin={{
                xs: 'auto',
                md: 'initial',
              }}
              display="block"
              onClick={() => {
                websitePageContext.toggleModalCadastro();
              }}
            >
              Cadastrar
            </Button>
          </Grid.Col>

          <Grid.Col value={{ xs: 12, md: 6 }}>
            <img
              alt="Imagem de celular mostrando o perfil do Cage no Instalura"
              style={{ display: 'block', margin: 'auto' }}
              src="https://bootcamp-alura-01-git-modulo01.omariosouto.vercel.app/images/phones.png"
            />
          </Grid.Col>
        </Grid.Row>
      </Grid.Container>
    </Box>
  );
};

export default websitePageHOC(HomeScreen, {
  seoProps: { headTitle: 'Home' },
  pageBoxProps: {
    backgroundImage: 'url(/images/bubbles.svg)',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'bottom right',
  },
});

// export default function Home() {
//   return (
//     <WebsitePageWrapper
//       seoProps={{ headTitle: 'Home' }}
//       pageBoxProps={{
//         backgroundImage: 'url(/images/bubbles.svg)',
//         backgroundRepeat: 'no-repeat',
//         backgroundPosition: 'bottom right',
//       }}
//     >
//       <HomeScreen />
//     </WebsitePageWrapper>
//   );
// }
