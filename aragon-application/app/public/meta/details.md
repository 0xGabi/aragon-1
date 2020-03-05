This application allows you to connect any events from your DAO to any webhooks.

Once installed, create a new connection by selecting the application and the event you want to connect, then enter the URL of the webhook to trigger.

When the connected event is emitted by your DAO, it will trigger the webhook with a POST request containing the event's data.

Here is an example of the data received by the webhook for the event StartVote of the Voting application:

```json
{
  "logIndex": 1,
  "transactionHash": "0x11ebbdd62ad891c50b4cf4fb9d76d3205993d7c949384e0cda9df92436370ef1",
  "transactionIndex": 0,
  "blockHash": "0xce7daf49b6b15b25375a8ea30f4ae86de8e3e86f8fcab304f2b8c2220c562676",
  "data": "0x0000000000000000000000000000000000000000000000000000000000000020000000000000000000000000000000000000000000000000000000000000001e54657374696e67206f746865722070726f63657373206465706c6f7965720000",
  "decodedData": {
    "0": "7",
    "1": "0x7FC7FfC3A0cf1D2cdd2C5584e0E5BB0C7EBBa254",
    "2": "Testing other process deployer",
    "__length__": 3,
    "creator": "0x7FC7FfC3A0cf1D2cdd2C5584e0E5BB0C7EBBa254",
    "metadata": "Testing other process deployer",
    "voteId": "7"
  },
  "eventSignature": "0x4d72fe0577a3a3f7da968d7b892779dde102519c25527b29cf7054f245c791b9",
  "address": "0x84d889c13318c0bf3717480859efc26a148f78e8",
  "blockNumber": 6038159,
  "topics": [
    "0x0000000000000000000000000000000000000000000000000000000000000007",
    "0x0000000000000000000000007fc7ffc3a0cf1d2cdd2c5584e0e5bb0c7ebba254"
  ]
}
```
