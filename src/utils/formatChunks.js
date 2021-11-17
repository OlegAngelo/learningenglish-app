export const formatChunks = (chunks) => {
  return chunks.map((chunk)=>{
    return {
      chunk_id : chunk.id,
      is_understood : chunk.isCorrect,
      is_exceeded_time_limit : chunk.isExceededTimeLimit,
      started_at : chunk.startedAt,
      finished_at : chunk.finishedAt,
    }
  })
};
