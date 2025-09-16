"use client"

import React, { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { CheckCircle, Clock, XCircle } from "lucide-react"

export type TransactionStatus = "pending" | "success" | "failed"

export interface TransactionRecord {
  id: string
  itemTitle: string
  txHash: string
  status: TransactionStatus
  timestamp: number
  errorMessage?: string
  gasUsed?: string
  gasPrice?: string
  blockNumber?: number
  network?: string
  contractAddress?: string
  transactionType?: 'purchase' | 'stake' | 'unstake' | 'claim' | 'nft_mint'
}

interface TransactionHistoryProps {
  transactions: TransactionRecord[]
  onClear: () => void
}

export function TransactionHistory({ transactions, onClear }: TransactionHistoryProps) {
  return (
    <section className="py-8">
      <div className="container mx-auto px-4">
        <Card>
          <CardHeader>
            <CardTitle>Transaction History</CardTitle>
            <Button variant="outline" size="sm" onClick={onClear}>
              Clear History
            </Button>
          </CardHeader>
          <CardContent>
            {transactions.length === 0 ? (
              <p className="text-center text-gray-500">No transactions yet.</p>
            ) : (
              <ul className="space-y-4">
                {transactions.map((tx) => (
                  <li
                    key={tx.id}
                    className="flex items-center justify-between border border-gray-200 rounded p-3"
                  >
                    <div>
                      <div className="font-semibold">{tx.itemTitle}</div>
                      <div className="text-xs font-mono text-gray-600">{tx.txHash}</div>
                      <div className="text-xs text-gray-500">
                        {new Date(tx.timestamp).toLocaleString()}
                      </div>
                      {tx.status === "failed" && tx.errorMessage && (
                        <div className="text-xs text-red-600 mt-1 whitespace-pre-wrap">{tx.errorMessage}</div>
                      )}
                    </div>
                    <div className="flex items-center gap-2">
                      {tx.status === "pending" && (
                        <>
                          <Clock className="text-yellow-500" />
                          <span className="text-yellow-600 font-semibold">Pending</span>
                        </>
                      )}
                      {tx.status === "success" && (
                        <>
                          <CheckCircle className="text-green-600" />
                          <span className="text-green-700 font-semibold">Success</span>
                        </>
                      )}
                      {tx.status === "failed" && (
                        <>
                          <XCircle className="text-red-600" />
                          <span className="text-red-700 font-semibold">Failed</span>
                        </>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </CardContent>
        </Card>
      </div>
    </section>
  )
}
