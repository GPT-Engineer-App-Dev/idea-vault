import { Container, Text, VStack, IconButton, Input, Textarea, Button, Box, Heading, SimpleGrid } from "@chakra-ui/react";
import { useState } from "react";
import { FaPlus, FaTrash } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");

  const addNote = () => {
    if (title.trim() && content.trim()) {
      setNotes([...notes, { title, content }]);
      setTitle("");
      setContent("");
    }
  };

  const deleteNote = (index) => {
    const newNotes = notes.filter((_, i) => i !== index);
    setNotes(newNotes);
  };

  return (
    <Container centerContent maxW="container.md" py={10}>
      <VStack spacing={4} width="100%">
        <Heading as="h1" size="xl">Note Taking App</Heading>
        <Input
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <Textarea
          placeholder="Content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
        />
        <Button
          leftIcon={<FaPlus />}
          colorScheme="teal"
          onClick={addNote}
        >
          Add Note
        </Button>
      </VStack>
      <SimpleGrid columns={[1, 2, 3]} spacing={4} mt={10} width="100%">
        {notes.map((note, index) => (
          <Box key={index} p={5} shadow="md" borderWidth="1px" borderRadius="md">
            <Heading fontSize="xl">{note.title}</Heading>
            <Text mt={4}>{note.content}</Text>
            <IconButton
              aria-label="Delete Note"
              icon={<FaTrash />}
              colorScheme="red"
              mt={4}
              onClick={() => deleteNote(index)}
            />
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;