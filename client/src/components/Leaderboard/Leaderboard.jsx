import React, { useState, useEffect } from "react";
import { Table, Image, Tag } from "antd";
import { HomeOutlined } from "@ant-design/icons";
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
      align: "center",
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
      align: "center",
    },
  ];

  return (
    <div className="p-16 bg-gradient-to-br from-[#D1C4E9] to-[#BBDEFB] min-h-screen">
      <div className="bg-white p-10 rounded-xl shadow-lg">
        <div className="flex justify-between">
          <h1 className="text-4xl text-gray-800 font-extrabold mb-10">
            OPTimism Leaderboard
          </h1>
          <HomeOutlined
            className="text-xl text-gray-800 font-extrabold mb-10 hover:scale-150 transition-transform duration-300"
            onClick={() => (window.location.href = "/home")}
          />
        </div>
        <Table
          dataSource={users}
          columns={columns}
          rowKey="id"
          pagination={{ pageSize: 10 }}
          className="rounded-lg transition-shadow hover:shadow-xl"
          size="middle"
          rowClassName="hover:bg-gray-100 transition-colors"
        />
      </div>
    </div>
  );
};

export default Leaderboard;
