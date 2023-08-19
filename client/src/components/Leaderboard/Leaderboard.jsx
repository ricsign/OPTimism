import React, { useState, useEffect } from "react";
import { Table, Image, Tag } from "antd";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../../utils/firebaseConfig";

// Fetching users from Firestore
const getUsers = async () => {
  const userCol = collection(db, "users");
  const userSnapshot = await getDocs(userCol);
  const userList = userSnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return userList;
};

const Leaderboard = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const userList = await getUsers();
      setUsers(
        userList.map((user) => ({
          ...user,
          healthScore: user.userMetadata?.healthScore || 0,
        }))
      );
    };
    fetchData();
  }, []);

  const columns = [
    {
      title: "Profile",
      dataIndex: "photoURL",
      render: (src, record) => (
        <div className="flex items-center space-x-4">
          <Image width={50} src={src} className="rounded-full" />
          <span>{record.displayName}</span>
        </div>
      ),
      sorter: (a, b) => a.name.localeCompare(b.name),
    },
    {
      title: "Health Score",
      dataIndex: "healthScore",
      sorter: (a, b) => a.healthScore - b.healthScore,
      render: (score) => (
        <Tag
          color={score > 50 ? "#34D399" : "#F87171"}
          className="rounded text-center w-20"
        >
          {score}
        </Tag>
      ),
      defaultSortOrder: "descend",
    },
  ];

  return (
    <div className="p-10 bg-gray-100 min-h-screen">
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h1 className="text-4xl text-gray-800 font-bold mb-6">
          OPTimism Leaderboard
        </h1>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="rounded-lg"
          size="middle"
        />
      </div>
    </div>
  );
};

export default Leaderboard;
