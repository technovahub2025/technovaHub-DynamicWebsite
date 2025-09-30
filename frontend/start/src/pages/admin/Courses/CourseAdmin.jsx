import React, { useState } from "react";
import Courseadd from "./Courseadd";
import CourseList from "./CourseList";

const CourseAdmin = () => {
  const [editingCourse, setEditingCourse] = useState(null); 
  const [refreshList, setRefreshList] = useState(false); 

  const handleEdit = (course) => setEditingCourse(course);
  const handleDone = () => {
    setEditingCourse(null);
    setRefreshList(!refreshList); 
  };

  return (
    <div>
      <Courseadd editingCourse={editingCourse} onDone={handleDone} />
      <CourseList onEdit={handleEdit} refresh={refreshList} />
    </div>
  );
};

export default CourseAdmin;
