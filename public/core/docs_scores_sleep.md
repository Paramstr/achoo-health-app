---
title: Sleep Score
navigationTitle: Sleep
description: Focused on assessing sleep health, this model takes into account various aspects of sleep such as total sleep time, sleep regularity, and night time activity. It aims to provide insights into sleep patterns and guide improvements for better sleep quality.
---

**Unlock the secrets of your sleep.** Our Sleep Score is a comprehensive measure of the quality and quantity of your sleep. It intricately combines various sleep aspects, offering a deeper understanding of your rest patterns and their overall impact on health. This guide breaks down the factors influencing the Sleep Score, providing insights into each element's role in enhancing your sleep health and well-being.

## At-a-Glance: Sleep Score

| Key | Values | Description |
| --- | --- | --- |
| type          | `sleep`                            | Type of score being calculated. |
| state         | `minimal`, `low`, `medium`, `high` | Overall state of sleep health based on the score, where high corresponds to optimal sleep health. |
| score         | 0.0 - 1.0                          | Overall sleep score, where 1.0 represents optimal. |
| factors       | Array of key-value pairs           | Detailed factors contributing to the overall score. |
| dataSources   | Array of Strings                   | Sources of data used to calculate the score. |
| createdAt     | ISO 8601 DateTime                  | Timestamp of when the score was created. |
| version       | Integer                            | Version of the scoring algorithm. |
| Status        | **PRODUCTION**                     | Score is in production. |


### Example Schema
```json
{
	"type": "sleep",
	"state": "high",
	"score": 0.90,
	"factors": [
		...,
	],
	"dataSources": ["age", "sleep"],
	"createdAt": "2023-11-11T11:05:41.644Z",
	"version": 1
}
```

### Factor Schema

| Aspect | Details                                                                                | Description  |
| ------ | -------------------------------------------------------------------------------------- | ------------ |
| name   | `sleep_duration`, `sleep_regularity`, `sleep_contiuity`, `sleep_debt`, `circadian_alignment`, `physical_recovery`, `mental_recovery`  | Name of the factor.                                              |
| value  | numerical                                                                                                                             | Actual measured value for the factor.                            |
| goal   | numerical or percentage -specific to each score                                                                                       | Target value for specific to each factor.                        |
| unit   | `sleep`, `age`, `gender`                                                                                                              | Unit of measurement for the factor.                              |
| score  | 0.0 - 1.0                                                                                                                             | Factor-specific score, where 1.0 represents optimal performance. |
| state  | `minimal`, `low`, `medium`, `high`                                                                                                    | Current state of the factor based on the factor score.           |

```json
{
    ...
    "factors": [
		{ "name": "sleep_duration",      "value": 400, "goal": 480, "unit": "minutes", "score": 0.93, "state": "high" },
		{ "name": "sleep_regularity",    "value": 70,  "goal": 100, "unit": "%",       "score": 0.70, "state": "medium" },
		{ "name": "sleep_continuity",    "value": 8,   "goal": 10, "unit": "minutes",  "score": 0.70, "state": "low" },
		{ "name": "sleep_debt", 	     "value": 400, "goal": 500, "unit": "minutes", "score": 0.85, "state": "high" },
		{ "name": "circadian_alignment", "value": 80,  "goal": 100, "unit": "%",       "score": 0.71, "state": "medium" },
		{ "name": "physical_recovery",   "value": 300, "goal": 100, "unit": "hours",   "score": 0.71, "state": "medium" },
		{ "name": "mental_recovery", 	 "value": 5,   "goal": 100, "unit": "floors",  "score": 0.50, "state": "medium" }
	],
    ...
}
```
---

# Understanding the Sleep Score

A higher score generally indicates better sleep quality and habits. Assess each factor's contribution to understand specific areas of strength or improvement.

## Interpreting the `state` and the `score`

Higher the score, healthier the sleep behaviour. You can choose to display the score or the state 

- **High** : Scores in this range indicate excellent sleep quality and quantity.
- **Medium** : This range suggests adequate sleep but with potential areas for improvement.
- **Low** : Indicates suboptimal sleep quality, suggesting significant deviations from optimal values in several factors.
- **Minimal** : Scores here indicate very poor sleep quality or quantity, warranting immediate attention for health improvement.

## Practical Use Cases for Sleep `factors`

These practical uses cases show the power of the sleep score and the way factors provide explainability 

The factors are constituents of the overall score defined through scientific research. Each factor plays a significant role in the overall Sleep Score and in defining overall movement health of the user. Here you will learn the basis behind each factor, the corresponding research papers as well as how to make best use of the schema for your use case.

### Case 1: Detecting and Addressing Short Sleep Duration

**Scenario**: Emma, a busy entrepreneur, is struggling with short sleep duration, frequently getting less than 6 hours of sleep per night. This is affecting her productivity and mood.

**Implementation**: Displaying the overall sleep score allows Emma to see something is wrong since it's consistently below 80. Emma also receives a notification saying that sleep duration is consistently low-medium and focusing on the sleep duration could help her get the score to near 100.

### Case 2: Monitoring Sleep Regularity

**Scenario**: Alex, a college student, has an irregular sleep schedule due to varying class times and social activities. His irregular sleep patterns are causing fatigue and affecting his academic performance.

**Implementation**: The app highlights that Alex's sleep regularity factor is consistently low, causing his overall sleep score to drop below 70. Alex receives an alert suggesting that improving sleep regularity could significantly boost his overall sleep score and improve his daytime alertness.

### Case 3: Managing Sleep Debt

**Scenario**: Priya, a healthcare worker, has accumulated significant sleep debt due to long shifts and inconsistent sleep patterns. This is impacting her overall health and job performance.

**Implementation**: Priya's sleep debt score is flagged as low, dragging down her overall sleep score to around 65. The app notifies Priya about her high sleep debt and provides visual tracking of her sleep debt over time, encouraging her to prioritize sleep to reduce this debt and improve her health.

### Case 4: Improving Circadian Alignment

**Scenario**: Jake, a software developer, often works late into the night and sleeps during the day. His misaligned sleep schedule is causing daytime drowsiness and affecting his productivity.

**Implementation**: The **app identifies that Jake's circadian alignment score is poor**, which lowers his overall sleep score to the low-medium range. Jake receives suggestions to gradually shift his sleep schedule to better align with natural light-dark cycles, which could enhance his overall sleep score and daytime alertness.

### Case 5: Enhancing Physical and Mental Recovery

**Scenario**: Lily, an athlete, knew about sleep's relationship to physical recovery but didn't know its importance for mental recovery. On days she didn't have training, she would not be strict with her sleep and do poorly in school.

**Implementation**: The app shows Lily that her physical recovery score is high, but her mental recovery score is low, resulting in an overall sleep score below 85. Lily receives insights on how consistent sleep patterns can enhance both physical and mental recovery, with suggestions to maintain a strict sleep schedule even on non-training days.

### Case 6: Reducing Nighttime Activity

**Scenario**: Michael, a marketing manager, experiences frequent nighttime awakenings that disrupt his sleep. This leads to morning fatigue and decreased productivity.

**Implementation**: The app detects that Michael's nighttime activity score is low, which significantly affects his overall sleep score, keeping it around 70. Michael receives feedback on how to minimize nighttime disruptions, such as creating a relaxing bedtime routine, which could help improve his overall sleep score and daytime energy levels.



## Factor Definitions

This section is a detailed breakdown of each factor, 

| Factor | Definition | Relevance | Reference |
| --- | --- | --- | --- |
| Sleep Duration | The total amount of sleep obtained during the night | Adequate sleep duration is crucial for overall health, cognitive function, and well-being | National Sleep Foundation. "Sleep Duration Recommendations: How Much Sleep Do You Really Need?" |
| Sleep Regularity | Consistency of bed and wake times across days | Consistent sleep patterns help regulate circadian rhythms and improve sleep quality | Fischer, D., et al. (2017). "Irregular sleep schedules are associated with poorer academic performance and delayed sleep/wake timing." |
| Sleep Continuity | Measure of how uninterrupted and restful the sleep period is, assessed by the total number of minutes lost due to restlessness,  and awakenings | Continuous sleep without frequent awakenings is important for restorative sleep | Ohayon, M.M., et al. (2017). "National Sleep Foundation’s sleep quality recommendations: first report." Sleep Health, 3(1), 6-19. |
| Sleep Debt | The cumulative shortfall of sleep relative to an individual's sleep needs over time. Sleep debt increases in a non-linear fashion as the effects of sleep loss compound more severely as the deficit grows | Minimising sleep debt is crucial for maintaining cognitive function and physical health. Sleep debt is a great measure of chronic sleep behaviour | Van Dongen, H.P.A., et al. (2003). "The cumulative cost of additional wakefulness: Dose-response effects on neurobehavioral functions and sleep physiology from chronic sleep restriction and total sleep deprivation." Sleep, 26(2), 117-126. |
| Circadian Alignment | Alignment of sleep timing with an individual's circadian rhythm | Proper alignment with circadian rhythms enhances sleep quality and daytime functioning | Roenneberg, T., et al. (2007). "Epidemiology of the human circadian clock." Sleep Medicine Reviews, 11(6), 429-438. |
| Physical Recovery | The duration, timing, and number of deep sleep cycles (slow-wave sleep) | Deep sleep is crucial for physical recovery, muscle repair, and overall health | Dijk, D.J. (2009). "Regulation and functional correlates of slow wave sleep." Journal of Clinical Sleep Medicine, 5(2 Suppl), S6-S15. |
| Mental Recovery | The duration, timing, and number of REM sleep cycles | REM sleep is important for cognitive function, memory consolidation, and emotional health | Walker, M.P. (2009). "The role of sleep in cognition and emotion." Annals of the New York Academy of Sciences, 1156(1), 168-197. |

### Factor Usage

Since each factor score comes with a `score`, the higher the score the healthier the biomarker value. You can choose to either display the score itself or show the `state` of the factor which divided in to 3 classes. The `goal` allows you to guage where the raw `value` (measured in the `units`) sits compared to the `goal` set for the factor. For example,  sleep debt's `value` with `units` in minutes has a `goal` of 0 mins.

| Factor | Score Interpretation | Goal Interpretation | Units | Wearable Only |
| --- | --- | --- | --- | --- |
| Sleep Duration | Higher score indicates a  more optimal sleep duration | Aim to achieve around 8 hours of sleep per night for optimal health | mins | No |
| Sleep Regularity | Higher score indicates better consistency in sleep patterns | Aim for a consistency of 15-30 mins across your bed and wake times day-to-day to  achieve the goal of 100% | % | No |
| Sleep Continuity | Higher score indicates better sleep quality with fewer disruptions | Aim to minimise interruptions and achieve less than 10 minutes of restlessness or awakenings per night. Recommend better sleep hygiene | mins | No |
| Sleep Debt | Higher score indicates low sleep debt and better overall sleep quality | Aim to have no sleep debt, striving for a balance where all sleep needs are met without accumulated deficits. | mins | No |
| Circadian Alignment | Higher score indicates better alignment with the body's natural circadian rhythm | Aim to align sleep patterns with natural circadian rhythms, achieving close to 100% alignment. | % | No |
| Physical Recovery | Higher score indicates healthier deep sleep cycle patterns | Aim for optimal deep sleep patterns, achieving 100% of the recommended duration and timing for deep sleep. | % | Yes |
| Mental Recovery | Higher score indicates healthier REM sleep cycle patterns | Aim for optimal REM sleep patterns, achieving 100% of the recommended duration and timing for REM sleep. | % | Yes |


# Understand the Sleep Score

A higher score generally indicates better sleep quality and habits. Assess each factor's contribution to understand specific areas of strength or improvement.

## Interpreting the `state`

- **High**: Scores in this range indicate excellent sleep quality and quantity.
- **Medium**: This range suggests adequate sleep but with potential areas for improvement.
- **Low**: Indicates suboptimal sleep quality, suggesting significant deviations from optimal values in several factors.
- **Minimal**: Scores here indicate very poor sleep quality or quantity, warranting immediate attention for health improvement.

## Understanding the `factors`

| Factor | Definition | Relevance | Reference |
| --- | --- | --- | --- |
| **Sleep Duration**      | The total amount of sleep obtained during the night | Adequate sleep duration is crucial for overall health, cognitive function, and well-being | National Sleep Foundation. "Sleep Duration Recommendations: How Much Sleep Do You Really Need?" |
| **Sleep Regularity**    | Consistency of bed and wake times across days | Consistent sleep patterns help regulate circadian rhythms and improve sleep quality | Fischer, D., et al. (2017). "Irregular sleep schedules are associated with poorer academic performance and delayed sleep/wake timing." |
| **Sleep Continuity**    | Measure of how uninterrupted and restful the sleep period is, assessed by the total number of minutes lost due to restlessness,  and awakenings | Continuous sleep without frequent awakenings is important for restorative sleep | Ohayon, M.M., et al. (2017). "National Sleep Foundation’s sleep quality recommendations: first report." Sleep Health, 3(1), 6-19. |
| **Sleep Debt**          | The cumulative shortfall of sleep relative to an individual's sleep needs over time. Sleep debt increases in a non-linear fashion as the effects of sleep loss compound more severely as the deficit grows | Minimising sleep debt is crucial for maintaining cognitive function and physical health. Sleep debt is a great measure of chronic sleep behaviour | Van Dongen, H.P.A., et al. (2003). "The cumulative cost of additional wakefulness: Dose-response effects on neurobehavioral functions and sleep physiology from chronic sleep restriction and total sleep deprivation." Sleep, 26(2), 117-126. |
| **Circadian Alignment** | Alignment of sleep timing with an individual's circadian rhythm | Proper alignment with circadian rhythms enhances sleep quality and daytime functioning | Roenneberg, T., et al. (2007). "Epidemiology of the human circadian clock." Sleep Medicine Reviews, 11(6), 429-438. |
| **Physical Recovery**   | The duration, timing, and number of deep sleep cycles (slow-wave sleep) | Deep sleep is crucial for physical recovery, muscle repair, and overall health | Dijk, D.J. (2009). "Regulation and functional correlates of slow wave sleep." Journal of Clinical Sleep Medicine, 5(2 Suppl), S6-S15. |
| **Mental Recovery**     | The duration, timing, and number of REM sleep cycles | REM sleep is important for cognitive function, memory consolidation, and emotional health | Walker, M.P. (2009). "The role of sleep in cognition and emotion." Annals of the New York Academy of Sciences, 1156(1), 168-197. |

### Using the `factors`

| Factor | Score Interpretation | Goal Interpretation | Units | Wearable Only |
| --- | --- | --- | --- | --- |
| **Sleep Duration** | Higher score indicates a  more optimal sleep duration | Aim to achieve around 8 hours of sleep per night for optimal health | mins | No |
| **Sleep Regularity** | Higher score indicates better consistency in sleep patterns | Aim for a consistency of 15-30mins across your bed and wake times day-to-day to   achieve the goal of 100% | % | No |
| **Sleep Continuity** | Higher score indicates better sleep quality with fewer disruptions | Aim to minimise interruptions and achieve less than 10 minutes of restlessness or awakenings per night. Recommend better sleep hygiene | mins | No |
| **Sleep Debt** | Higher score indicates low sleep debt and better overall sleep quality | Aim to have no sleep debt, striving for a balance where all sleep needs are met without accumulated deficits. | mins | No |
| **Circadian Alignment** | Higher score indicates better alignment with the body's natural circadian rhythm | Aim to align sleep patterns with natural circadian rhythms, achieving close to 100% alignment. | % | No |
| **Physical Recovery** | Higher score indicates healthier deep sleep cycle patterns | Aim for optimal deep sleep patterns, achieving 100% of the recommended duration and timing for deep sleep. | % | Yes |
| **Mental Recovery** | Higher score indicates healthier REM sleep cycle patterns | Aim for optimal REM sleep patterns, achieving 100% of the recommended duration and timing for REM sleep. | % | Yes |


## Using the Score for Improvement

Identify factors contributing negatively to the score for targeted interventions. For example, if sleep routine and sleep debt have high negative values in the factors, improving sleep routine or reducing sleep debt can positively affect the score.

## Limitations and Considerations

This score is a well-being indicator and not a diagnostic measure. Individual variations and external factors can influence the score. Consult healthcare professionals for a comprehensive sleep assessment.

{% callout title="Note" %}
For effective utilization of our products, we encourage you to explore our [best practices guide.](/docs/guides/best-practices)
{% /callout %}


# Frequently Asked Questions (FAQs)

**Q: How can I improve my Sleep Score?**

A: To enhance your Sleep Score, focus on establishing a regular sleep schedule, minimize nighttime disturbances, and align your sleep routine with your natural circadian rhythms. Implementing relaxation techniques and creating a conducive sleep environment can also be beneficial.

**Q: Is it possible to recover from sleep debt?**

A: Yes, recovering from sleep debt is possible. This can be achieved by gradually increasing your sleep duration and maintaining consistent sleep patterns, including on weekends. Prioritizing sleep and adjusting your schedule to allow for more rest can effectively reduce sleep debt over time.

**Q: What does a `high` sleep score indicate?**

A: A `high` sleep score is indicative of excellent sleep quality, regularity, and minimal sleep debt. This state reflects a healthy sleep pattern that positively contributes to overall well-being and health.

**Q: Can the sleep score diagnose sleep disorders?**

A: The sleep score is primarily an informational tool and is not designed to diagnose sleep disorders. While it provides valuable insights into your sleep patterns and highlights potential areas for improvement, it should not replace professional medical advice. For concerns regarding sleep disorders, it's recommended to consult with a healthcare professional.
