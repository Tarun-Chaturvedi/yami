const mongoose = require('mongoose');

const ratingSchema = new mongoose.Schema({
  score: { type: Number, required: true, min: 0, max: 5 },
  note: { type: String, required: true, trim: true },
  details: { type: Map, of: mongoose.Schema.Types.Mixed } // Allows flexible key-value pairs for deep-dive stats
}, { _id: false });

const heritageSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  location: { type: String, required: true },
  image: { type: String, required: true },
  description: { type: String, required: true },
  ratings: {
    transport: ratingSchema,
    food: ratingSchema,
    safety: ratingSchema,
    disability: ratingSchema,
    hygiene: ratingSchema,
  },
  overallAvg: { type: Number, default: 0 },
  isPublished: { type: Boolean, default: false } // Nominations stay hidden until reviewed
}, { timestamps: true });

// Pre-save hook to calculate the overall average automatically
heritageSchema.pre('save', function() {
  if (this.ratings) {
    const scores = [
      this.ratings.transport?.score || 0,
      this.ratings.food?.score || 0,
      this.ratings.safety?.score || 0,
      this.ratings.disability?.score || 0,
      this.ratings.hygiene?.score || 0
    ].filter(score => score > 0);

    if (scores.length > 0) {
      const sum = scores.reduce((a, b) => a + b, 0);
      this.overallAvg = Number((sum / scores.length).toFixed(1));
    }
  }
});

module.exports = mongoose.model('Heritage', heritageSchema);
