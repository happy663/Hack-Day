import { Image, Text, View } from 'react-native';

type Profile = {
  name: string;
  image: string;
};

type Card = {
  profile: Profile;
  description: string;
  backgroundColor: string;
  tags: string[];
};

export const Card = (props: Card) => {
  const {
    profile: { name, image },
    description,
    backgroundColor,
    tags,
  } = props;

  return (
    <View
      style={{
        backgroundColor: backgroundColor,
        width: '75vw',
        borderRadius: 10,
        height: '55vh',
        justifyContent: 'space-between',
      }}
    >
      <View
        style={{
          backgroundColor: '#84FAB0',
          borderTopRightRadius: 10,
          borderTopLeftRadius: 10,
        }}
      >
        <View
          style={{
            alignItems: 'flex-end',
          }}
        >
          <Text
            style={{
              width: '25vw',
              backgroundColor: '#FF5555',
              borderBottomLeftRadius: 10,
              borderTopRightRadius: 10,
              fontWeight: 'bold',
              textAlign: 'center',
              paddingTop: '5px',
              paddingBottom: '5px',
              color: 'white',
            }}
          >
            回答受付中
          </Text>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'flex-start',
            alignItems: 'center',
            // @ts-ignore
            gap: '20px',
            marginLeft: '20px',
          }}
        >
          <Image
            source={require('./assets/lefty.png')}
            style={{
              height: 40,
              width: 40,
            }}
          />
          <View
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'flex-start',
              justifyContent: 'flex-start',
            }}
          >
            <Text
              style={{
                fontSize: 12,
                marginTop: '5px',
                color: 'black',
              }}
            >
              {name}
            </Text>
            <Text>2022/09/11 16:09</Text>
          </View>
        </View>
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            // @ts-ignore
            gap: '10px',
            justifyContent: 'center',
            marginTop: '10px',
            marginBottom: '10px',
          }}
        >
          <Text
            style={{
              backgroundColor: 'white',
              borderRadius: 70,
              paddingRight: '10px',
              paddingLeft: '10px',
              color: 'black',
            }}
          >
            悩み
          </Text>
          <Text
            style={{
              backgroundColor: 'white',
              borderRadius: 70,
              paddingRight: '10px',
              paddingLeft: '10px',
              color: 'black',
            }}
          >
            友達
          </Text>
          <Text
            style={{
              backgroundColor: 'white',
              borderRadius: 70,
              paddingRight: '10px',
              paddingLeft: '10px',
              color: 'black',
            }}
          >
            友達
          </Text>
          <Text
            style={{
              backgroundColor: 'white',
              borderRadius: 70,
              paddingRight: '10px',
              paddingLeft: '10px',
              color: 'black',
            }}
          >
            友達
          </Text>
        </View>
        <View
          style={{
            padding: '10px',
            backgroundColor: 'white',
            display: 'flex',
            flexDirection: 'column',
          }}
        >
          <Text>{description}</Text>
        </View>
      </View>
      <View
        style={{
          borderBottomRightRadius: 10,
          borderBottomLeftRadius: 10,
          backgroundColor: '#84FAB0',
        }}
      >
        <Text
          style={{
            textAlign: 'center',
          }}
        >
          3件の回答がつきました
        </Text>
      </View>
    </View>
  );
};
