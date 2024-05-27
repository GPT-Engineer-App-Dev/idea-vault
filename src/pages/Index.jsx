import { useState } from "react";
import { Box, Container, VStack, HStack, Text, IconButton, Input, Textarea, Button, SimpleGrid } from "@chakra-ui/react";
import { FaPlus, FaTrash, FaEdit } from "react-icons/fa";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  const handleAddNote = () => {
    if (title && content) {
      setNotes([...notes, { id: Date.now(), title, content }]);
      setTitle("");
      setContent("");
    }
  };

  const handleDeleteNote = (id) => {
    setNotes(notes.filter(note => note.id !== id));
  };

  const handleEditNote = (id) => {
    const note = notes.find(note => note.id === id);
    setTitle(note.title);
    setContent(note.content);
    setIsEditing(true);
    setCurrentNoteId(id);
  };

  const handleUpdateNote = () => {
    setNotes(notes.map(note => note.id === currentNoteId ? { ...note, title, content } : note));
    setTitle("");
    setContent("");
    setIsEditing(false);
    setCurrentNoteId(null);
  };

  return (
    <Container maxW="container.xl" p={4}>
      <Box as="nav" bg="blue.500" color="white" p={4} mb={4}>
        <Text fontSize="xl" fontWeight="bold">Note Taking App</Text>
      </Box>
      <VStack spacing={4} mb={4}>
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
        {isEditing ? (
          <Button colorScheme="blue" onClick={handleUpdateNote}>Update Note</Button>
        ) : (
          <Button colorScheme="blue" onClick={handleAddNote}>Add Note</Button>
        )}
      </VStack>
      <SimpleGrid columns={{ sm: 1, md: 2, lg: 3 }} spacing={4}>
        {notes.map(note => (
          <Box key={note.id} p={4} borderWidth="1px" borderRadius="md">
            <HStack justifyContent="space-between">
              <Text fontSize="xl" fontWeight="bold">{note.title}</Text>
              <HStack>
                <IconButton 
                  icon={<FaEdit />} 
                  onClick={() => handleEditNote(note.id)} 
                  aria-label="Edit Note" 
                />
                <IconButton 
                  icon={<FaTrash />} 
                  onClick={() => handleDeleteNote(note.id)} 
                  aria-label="Delete Note" 
                />
              </HStack>
            </HStack>
            <Text mt={2}>{note.content}</Text>
          </Box>
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default Index;