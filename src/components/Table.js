import React from "react";
import { Box, DataTable, Meter, Text } from "grommet";
import { RoutedAnchor } from "../components"

export const Table = ({ columns, data }) => (
  <Box width="large">
    <DataTable
      columns={columns || []}
      data={data || []}
    />
  </Box>
)