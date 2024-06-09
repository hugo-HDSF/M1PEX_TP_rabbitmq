import './App.css';
import { ChakraProvider } from '@chakra-ui/react';
import {
  Flex,
  Button,
  Input,
  Text,
  HStack,
  Stack,
  Heading,
} from '@chakra-ui/react';
import React, { useEffect, useRef } from 'react';
import useWebSocket from 'react-use-websocket';
import { v4 as uuidv4 } from 'uuid';

const Message = ({ message, user, time, isCurrentUser }) => {
  return (
    <Flex
      paddingRight={2}
      paddingLeft={2}
      paddingTop={0.5}
      paddingBottom={0.5}
      bg={isCurrentUser ? 'blue.500' : 'gray.100'}
      color={isCurrentUser ? 'white' : 'gray.600'}
      borderRadius="md"
      alignSelf={isCurrentUser ? 'flex-end' : 'flex-start'}
    >
      <Stack spacing={0}>
        <Text align={isCurrentUser ? 'right' : 'left'} color="gray.300" fontSize="xs">
          {user}
        </Text>
        <Text fontSize="sm">{message}</Text>
        <Text align={isCurrentUser ? 'right' : 'left'} color="gray.300" fontSize="xs">
          {time}
        </Text>
      </Stack>
    </Flex>
  );
};

function App() {
  return (
    <ChakraProvider>
      <Content />
    </ChakraProvider>
  );
}

export default App;

function Content() {
  const [message, setMessage] = React.useState('');
  const inputRef = useRef(null);

  const handleMessageChange = (event) => {
    setMessage(event.target.value);
  };

  const [name, setName] = React.useState('user');
  const handleNameChange = (event) => {
    setName(event.target.value);
  };

  const [messageLog, setMessageLog] = React.useState([]);
  const [userId, setUserId] = React.useState('');

  useEffect(() => {
    const id = uuidv4();
    setUserId(id);
    inputRef.current.focus();
  }, []);

  const { sendMessage } = useWebSocket(process.env.REACT_APP_WS_URL, {
    onOpen: () => {
      console.log('WebSocket connection opened');
    },
    onClose: () => {
      console.log('WebSocket connection closed');
    },
    onError: (error) => {
      console.error('WebSocket error:', error);
    },
    onMessage: (messageEvent) => {
      const msg = JSON.parse(messageEvent.data);
      if (msg.message !== null && msg.message !== '') {
        setMessageLog((prev) => [...prev, msg]);
      }
    },
  });

  const sendMessageToEveryone = () => {
    const currentTime = new Date().toLocaleTimeString();
    const newMessage = {
      username: name,
      time: currentTime,
      message: message,
      userId: userId,
    };
    sendMessage(JSON.stringify(newMessage));
    setMessage(''); // Clear the message input field after sending
    inputRef.current.focus(); // Keep the focus on the input field
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      sendMessageToEveryone();
    }
  };

  return (
    <Flex h="100vh" py={12}>
      <Flex
        flexDirection="column"
        w="xl"
        m="auto"
        h="full"
        borderWidth="1px"
        roundedTop="lg"
        borderRadius="6"
      >
        <HStack
          borderTopLeftRadius={6}
          borderTopRightRadius={6}
          p={2}
          bg="blue.500"
        >
          <Heading as="h2" size="sm" color="white">
            Chat App
          </Heading>
          <Input
            borderRadius={6}
            size="xs"
            maxW="200px"
            placeholder="Name"
            backgroundColor="white"
            value={name}
            onChange={handleNameChange}
          />
        </HStack>

        <Stack
          px={2}
          py={2}
          overflow="auto"
          flex={1}
          css={{
            '&::-webkit-scrollbar': {
              width: '4px',
            },
            '&::-webkit-scrollbar-track': {
              width: '6px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: '#d5e3f7',
              borderRadius: '24px',
            },
          }}
        >
          {messageLog.map((message, index) => (
            <Message
              key={index}
              message={message.message}
              user={message.username}
              time={message.time}
              isCurrentUser={message.userId === userId}
            />
          ))}
        </Stack>
        <HStack
          borderBottomLeftRadius={6}
          borderBottomRightRadius={6}
          p={2}
          bg="gray.100"
        >
          <Input
            ref={inputRef}
            borderRadius={6}
            size="xs"
            bg="white"
            placeholder="Enter your message"
            value={message}
            onChange={handleMessageChange}
            onKeyPress={handleKeyPress}
          />
          <Button size="xs" colorScheme="blue" onClick={sendMessageToEveryone}>
            Send
          </Button>
        </HStack>
      </Flex>
    </Flex>
  );
}
