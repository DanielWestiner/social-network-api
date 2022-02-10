const { Schema, model, Types } = require('mongoose');

// Reaction schema to be used as the reation field's subdoc in Thought model below
const reactionSchema = new Schema(
  {
    reactionId: {
      type: Schema.Types.ObjectId,
      default: new Types.ObjectId()
    },
    reactionBody: {
      type: String,
      required: true,
      maxlength: 280
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: Date.now()
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);


// Schema to create a Thought model
const thoughtSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      maxlength: 280
    },
    createdAt: {
      type: Date,
      default: Date.now(),
      get: Date.now()
    },
    username: {
      type: String,
      required: true,
    },
    reactions: 
      [reactionSchema]
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

thoughtSchema
.virtual("reactionCount")
.get(function() {
  return this.reactions.length;
});

const Thought = model('Thought', thoughtSchema);


module.exports = Thought;
