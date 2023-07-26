import { signOut, onAuthStateChanged } from "firebase/auth";
import { auth, db } from "@/firebase/firebase";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { Inter } from "next/font/google";
import { uid } from "uid";
import { set, ref, onValue, remove, update } from "firebase/database";
import { json } from "stream/consumers";
const inter = Inter({ subsets: ["latin"] });
import styles from "@/styles/Home.module.css";
function dashboard() {
  type userinfo = { name: string; email: string };
  const [userInfo, setUserInfo] = useState<userinfo | string>("");
  const [userName, setUserName] = useState("");
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [isEdit, setIsEdit] = useState(false);
  const [tempUidd, setTempUidd] = useState("");
  const router = useRouter();
  const user = useSelector(
    (state: { user: { name: string; email: string } }) => state.user
  );
  console.log(user, "user name");

  useEffect(() => {
    if (typeof user.name !== "undefined") {
      // Access and use local storage here
      // For example:
      localStorage.setItem("username", JSON.stringify(user));
      const userinfo = localStorage.getItem("username");
      console.log(userinfo);
      setUserInfo(JSON.parse(userinfo));
    }
  }, []);
  console.log(userInfo);
  // const userinfo = localStorage.getItem("username");
  // console.log(userinfo);

  const handleSignout = async () => {
    try {
      await signOut(auth);
      router.push("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    auth.onAuthStateChanged((user) => {
      if (user) {
        // read
        onValue(ref(db, `/${auth.currentUser.uid}`), (snapshot) => {
          setTodos([]);
          const data = snapshot.val();
          if (data !== null) {
            Object.values(data).map((todo) => {
              setTodos((oldArray) => [...oldArray, todo]);
            });
          }
        });
      } else if (!user) {
        router.push("/");
      }
    });
  }, []);

  // add
  const writeToDatabase = () => {
    const uidd = uid();
    set(ref(db, `/${auth.currentUser.uid}/${uidd}`), {
      todo: todo,
      uidd: uidd,
    });

    setTodo("");
  };
  // read
  // update
  type typetodo = {
    todo: string;
    uidd: string;
  };
  const handleEdit = (todo: typetodo) => {
    setIsEdit(true);
    setTodo(todo.todo);
    setTempUidd(todo.uidd);
  };

  const handleEditConfirm = () => {
    update(ref(db, `/${auth.currentUser.uid}/${tempUidd}`), {
      todo: todo,
      tempUidd: tempUidd,
    });

    setTodo("");
    setIsEdit(false);
  };

  // delete
  const handleDelete = (uid: string) => {
    remove(ref(db, `/${auth.currentUser.uid}/${uid}`));
  };

  return (
    <div className={`${styles.main} ${inter.className}`}>
      <h1 className={styles.userInfo}>User Name : {userInfo?.name}</h1>
      <div className={styles.inputAddBox}>
        <input
          className={styles.input}
          type="text"
          placeholder="add todos..."
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
        />
        <button
          className={styles.addButton}
          onClick={() => {
            writeToDatabase();
          }}
        >
          ADD
        </button>
      </div>

      {todos.map((todo: typetodo) => (
        <div className={styles.todosContainer} key={todo?.uidd}>
          <h1 className={styles.todotext}>{todo?.todo}</h1>
          <div className={styles.todoButtonContainer}>
            <button
              className={styles.addButton}
              onClick={() => handleDelete(todo?.uidd)}
            >
              Delete
            </button>
            <button
              className={styles.addButton}
              onClick={() => handleEdit(todo)}
            >
              Edit
            </button>
            <button className={styles.addButton} onClick={handleEditConfirm}>
              Update
            </button>
          </div>
        </div>
      ))}

      <button className={styles.signoutButton} onClick={handleSignout}>
        Sign out
      </button>
    </div>
  );
}

export default dashboard;