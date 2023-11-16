import React from 'react';
import {
  Input,
  NativeBaseProvider,
  Box,
  Checkbox,
  Text,
  Heading,
  AlertDialog,
  HStack,
  VStack,
  Icon,
  IconButton,
  Button,
} from 'native-base';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
const ToDo = function () {
  const [inputValue, setInputValue] = React.useState('');
  const [isDialogOpened, setIsDialogOpened] = React.useState(false);
  const [targetIndex, setTargetIndex] = React.useState();
  const [items, setItems] = React.useState([
    {
      name: 'Code Todo',
      isCompleted: false,
    },
    {
      name: 'Gratitude',
      isCompleted: false,
    },
    {
      name: 'Drink 8 glasses of water',
      isCompleted: true,
    },
  ]);
  function addItem(value) {
    setItems([...items, {name: value, isCompleted: false}]);
  }
  function removeItem(index) {
    const temp = items.filter((_, itemIndex) => itemIndex !== index);
    setItems(temp);
  }
  function handleChange(index) {
    const temp = items.map((item, itemI) =>
      itemI !== index
        ? item
        : {
            ...item,
            isCompleted: !item.isCompleted,
          },
    );
    setItems(temp);
  }
  return (
    <VStack mt={7} w="90%" space={4}>
      <AlertDialog
        isOpen={isDialogOpened}
        motionPreset="fade"
        bgColor="emerald.200">
        <AlertDialog.Content>
          <AlertDialog.CloseButton />
          <AlertDialog.Header fontWeight="bold" fontSize="lg">
            Delete Task?
          </AlertDialog.Header>
          <AlertDialog.Body>Sure you wanna delete the task?</AlertDialog.Body>
          <AlertDialog.Footer>
            <Button
              colorScheme="green"
              onPress={() => {
                removeItem(targetIndex);
                setIsDialogOpened(false);
              }}
              mr={3}>
              Yes
            </Button>
            <Button colorScheme="red" onPress={() => setIsDialogOpened(false)}>
              no
            </Button>
          </AlertDialog.Footer>
        </AlertDialog.Content>
      </AlertDialog>
      <Heading color="emerald.400">My ToDo List:</Heading>
      <Input
        bg="gray.200"
        placeholder="type your task"
        value={inputValue}
        onChangeText={value => setInputValue(value)}
        InputRightElement={
          <IconButton
            icon={<Icon as={FontAwesome5} name="plus" size={4} />}
            onPress={() => {
              addItem(inputValue);
              setInputValue('');
            }}
          />
        }
        variant="solid"
      />
      <Box>
        {items.map((item, itemIndex) => {
          // console.log(item)
          return (
            <HStack key={itemIndex} w="100%" justifyContent="space-between">
              <Checkbox
                isChecked={item.isCompleted}
                colorScheme="emerald"
                onChange={() => handleChange(itemIndex)}>
                <Text pl={3} strikeThrough={item.isCompleted}>
                  {item.name}
                </Text>
              </Checkbox>
              <IconButton
                icon={
                  <Icon
                    as={FontAwesome5}
                    name="trash"
                    size={5}
                    color="emerald.500"
                  />
                }
                onPress={() => {
                  setTargetIndex(itemIndex);
                  setIsDialogOpened(true);
                }}
              />
            </HStack>
          );
        })}
      </Box>
    </VStack>
  );
};
const App = function () {
  return (
    <NativeBaseProvider>
      <Box alignItems="center" flex={1}>
        <ToDo />
      </Box>
    </NativeBaseProvider>
  );
};
export default App;
