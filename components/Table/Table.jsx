"use client";
import React, { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { frameworks } from "@/utils/common.js";
import { useCountry } from "@/context/countrySelect.js";

const TableTrends = ({ selectedTrend }) => {
  const [trends, setTrends] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { selectedCountry } = useCountry(); // Get selected country from context
  const placeId = selectedCountry.placeId; // Use placeId from context

  const formatCount = (count) => {
    if (count >= 1000) {
      return (count / 1000).toFixed(1) + "K"; // Format to one decimal place followed by "K"
    }
    return count; // Return the original count if less than 1000
  };

  const fetchTrends = async () => {
    if (!placeId) return; // Exit if placeId is not set
    try {
      const response = await fetch(
        `https://twitter-trends-backend-production.up.railway.app/api/trends/${placeId}` , {
          mode: 'no-cors'
        } // Replace with your actual API endpoint
      );
      if (!response.ok) {
        throw new Error("Failed to fetch trends");
      }
      const data = await response.json();
      setTrends(data.trending.trends); // Assuming the data structure based on your controller
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (placeId) {
      fetchTrends(); // Call fetchTrends when placeId is set
    }
  }, [placeId]); // Dependency on placeId

  if (loading) return <div>Loading trends...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div>
      <Table>
        <TableCaption>
          Last Updated {new Date().toLocaleTimeString()}
        </TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[100px]">Rank</TableHead>
            <TableHead>Trends/Hashtag</TableHead>
            <TableHead>Tweet Counts</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {trends.map((trend) => (
            <TableRow key={trend.rank}>
              <TableCell className="font-medium">{trend.rank}</TableCell>
              <TableCell>{trend.name}</TableCell>
              <TableCell>{formatCount(trend.postCount)}</TableCell>
              <TableCell className="text-right">Copy</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableTrends;
