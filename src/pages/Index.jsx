import { useState } from "react";
import { Box, Container, VStack, HStack, Text, IconButton, Input, Textarea, Button, SimpleGrid } from "@chakra-ui/react";
import { FaTrash, FaPlus } from "react-icons/fa";

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
    <Container maxW="container.xl" p={4}>
      <VStack spacing={4} align="stretch">
        <HStack justifyContent="space-between" w="100%">
          <Text fontSize="2xl" fontWeight="bold">Note Taking App</Text>
          <IconButton aria-label="Add Note" icon={<FaPlus />} onClick={addNote} />
        </HStack>
        <Box>
          <Input
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            mb={2}
          />
          <Textarea
            placeholder="Content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            mb={2}
          />
          <Button onClick={addNote} colorScheme="teal" w="100%">Add Note</Button>
        </Box>
        <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
          {notes.map((note, index) => (
            <Box key={index} p={4} borderWidth="1px" borderRadius="md" boxShadow="md">
              <HStack justifyContent="space-between">
                <Text fontSize="xl" fontWeight="bold">{note.title}</Text>
                <IconButton aria-label="Delete Note" icon={<FaTrash />} onClick={() => deleteNote(index)} />
              </HStack>
              <Text mt={2}>{note.content}</Text>
            </Box>
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
};

export default Index;