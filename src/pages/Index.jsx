import { useState } from "react";
import { Box, Button, Container, Flex, Grid, Heading, IconButton, Input, Textarea, VStack } from "@chakra-ui/react";
import { AddIcon, DeleteIcon, EditIcon } from "@chakra-ui/icons";

const Index = () => {
  const [notes, setNotes] = useState([]);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isEditing, setIsEditing] = useState(false);
  const [currentNoteId, setCurrentNoteId] = useState(null);

  const handleAddNote = () => {
    if (title && content) {
      const newNote = { id: Date.now(), title, content };
      setNotes([...notes, newNote]);
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
      <Flex justifyContent="space-between" alignItems="center" mb={4}>
        <Heading as="h1" size="lg">Note Taking App</Heading>
        <Button leftIcon={<AddIcon />} colorScheme="teal" onClick={handleAddNote}>
          Add Note
        </Button>
      </Flex>
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
          <Button colorScheme="teal" onClick={handleUpdateNote}>
            Update Note
          </Button>
        ) : (
          <Button colorScheme="teal" onClick={handleAddNote}>
            Add Note
          </Button>
        )}
      </VStack>
      <Grid templateColumns="repeat(auto-fill, minmax(250px, 1fr))" gap={6}>
        {notes.map(note => (
          <Box key={note.id} p={4} borderWidth="1px" borderRadius="lg">
            <Heading as="h3" size="md" mb={2}>{note.title}</Heading>
            <Box mb={2}>{note.content}</Box>
            <Flex justifyContent="space-between">
              <IconButton icon={<EditIcon />} onClick={() => handleEditNote(note.id)} />
              <IconButton icon={<DeleteIcon />} onClick={() => handleDeleteNote(note.id)} />
            </Flex>
          </Box>
        ))}
      </Grid>
    </Container>
  );
};

export default Index;